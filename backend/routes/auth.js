const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment");
//const User = require("../models/User");
const Complaint = require("../models/Complaint");
const MaintenancePayment = require("../models/MaintenancePayment");
const bcrypt = require("bcryptjs");
const User = require('../models/User');

// -- Register Apartment
router.post("/register-apartment", async (req, res) => {
  try {
    const { name } = req.body;

    console.log('Apartment registration request:', { name });
    console.log('Full request body:', req.body);

    if (!name) {
      console.log('Validation failed: Missing apartment name');
      return res.status(400).json({ error: "Apartment name is required" });
    }

    const apartmentCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    console.log('Generated apartment code:', apartmentCode);

    const newApartment = new Apartment({ name, apartmentCode });
    console.log('Created apartment object:', newApartment);

    await newApartment.save();
    console.log('Apartment saved successfully:', { name, apartmentCode });

    res.status(201).json({ message: "Apartment registered", apartmentCode });
  } catch (err) {
    console.error("Apartment registration error details:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error code:", err.code);
    console.error("Full error object:", err);

    if (err.code === 11000) {
      return res.status(400).json({ error: "Apartment code already exists, please try again" });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// -- Signup (Admin/Resident)
router.post("/signup-admin", async (req, res) => {
  await signupUser(req, res, "admin");
});

router.post("/signup-resident", async (req, res) => {
  await signupUser(req, res, "resident");
});

const signupUser = async (req, res, role) => {
  try {
    const { username, phoneNumber, flatNumber, password, apartmentCode } = req.body;

    const apartment = await Apartment.findOne({ apartmentCode });
    if (!apartment) return res.status(400).json({ error: "Invalid apartment code" });

    const existingUser = await User.findOne({ phoneNumber, apartment: apartment._id });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      phoneNumber,
      flatNumber,
      password: hashedPassword,
      role,
      apartment: apartment._id,
      apartmentCode,
    });

    await user.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    console.error(`${role} signup error:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// -- Login
router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber }).populate("apartment");

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const responseData = {
      message: "Login successful",
      role: user.role,
      phone: user.phoneNumber,
      username: user.username,
      flatNumber: user.flatNumber,
      apartmentCode: user.apartment.apartmentCode,
      apartmentId: user.apartment._id,
      name: user.role === "admin"
        ? `Admin of ${user.apartment.name}`
        : `Resident of ${user.apartment.name}`
    };

    console.log('Login response data:', responseData);
    res.status(200).json(responseData);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -- Validate User (no token, just phone)
router.post("/validate", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber }).populate("apartment");

    if (!user) return res.status(404).json({ error: "User not found" });

    const validateResponse = {
      phone: user.phoneNumber,
      username: user.username,
      role: user.role,
      flatNumber: user.flatNumber,
      apartmentCode: user.apartment.apartmentCode,
      apartmentId: user.apartment._id,
      name: user.role === "admin"
        ? `Admin of ${user.apartment.name}`
        : `Resident of ${user.apartment.name}`
    };

    console.log('Validate response data:', validateResponse);
    res.status(200).json(validateResponse);
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -- New Complaint
router.post("/new-complaint", async (req, res) => {
  try {
    const { title, description, category, priority, additionalInfo, phoneNumber } = req.body;

    if (!title || !description || !category || !priority || !phoneNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ phoneNumber }).populate("apartment");
    if (!user) return res.status(400).json({ error: "User not found" });

    const complaint = new Complaint({
      title,
      description,
      category,
      priority,
      additionalInfo,
      phoneNumber,
      user: user._id,
      apartment: user.apartment._id
    });



    await complaint.save();
    res.status(201).json({ message: "Complaint created", complaint });
  } catch (err) {
    console.error("Complaint creation error:", err);
    res.status(500).json({ error: err.message });
  }
});



// -- Get All Complaints by Phone Number
// GET all complaints

router.get("/all-complaint", async (req, res) => {
  try {
    const { apartmentCode } = req.query;

    let filter = {};

    if (apartmentCode) {
      // Find apartment by its code
      const apartment = await Apartment.findOne({ apartmentCode });
      if (!apartment) {
        return res.status(404).json({ error: "Apartment not found" });
      }
      filter.apartment = apartment._id;
    }

    const complaints = await Complaint.find(filter)
      .populate("user", "name username phoneNumber flatNumber")
      .populate("apartment", "apartmentCode")
      .sort({ createdAt: -1 });

    res.status(200).json({ complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/tickets/stats/:apartmentCode
router.get('/stats/:apartmentCode', async (req, res) => {
  const { apartmentCode } = req.params;

  try {
    const apartment = await Apartment.findOne({ apartmentCode });
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    const [open, inProgress, resolved] = await Promise.all([
      Complaint.countDocuments({ apartment: apartment._id, status: { $regex: /^open$/i } }),
      Complaint.countDocuments({ apartment: apartment._id, status: { $regex: /^in progress$/i } }),
      Complaint.countDocuments({ apartment: apartment._id, status: { $regex: /^resolved$/i } })
    ]);

    res.json({ open, inProgress, resolved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /neighbors?apartmentCode=XYZ123&excludeFlat=101
// Corrected route
router.get('/neighbors/:apartmentCode', async (req, res) => {
  const { apartmentCode } = req.params;

  try {
    let neighbors = await User.find({ apartmentCode })
      .select('-password')
      .exec();

    // Ensure only one admin per apartment, rest are residents
    const admins = neighbors.filter(u => u.role === 'admin');
    if (admins.length > 1) {
      // Keep the first as admin, set the rest to resident
      const [keepAdmin, ...toDemote] = admins;
      await Promise.all(toDemote.map(u => User.findByIdAndUpdate(u._id, { role: 'resident' })));
      // Refetch neighbors after update
      neighbors = await User.find({ apartmentCode })
        .select('-password')
        .exec();
    }

    res.status(200).json({ neighbors });
  } catch (err) {
    console.error("Error fetching neighbors:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Set or update maintenance amount (admin)
router.post('/maintenance/amount', async (req, res) => {
  try {
    const { apartmentCode, amount } = req.body;
    const apartment = await Apartment.findOneAndUpdate(
      { apartmentCode },
      { maintenanceAmount: amount },
      { new: true }
    );
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
    res.status(200).json({ message: 'Maintenance amount updated', maintenanceAmount: apartment.maintenanceAmount });
  } catch (err) {
    console.error('Error updating maintenance amount:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get maintenance amount (resident)
router.get('/maintenance/amount', async (req, res) => {
  try {
    const { apartmentCode } = req.query;
    const apartment = await Apartment.findOne({ apartmentCode });
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
    res.status(200).json({ maintenanceAmount: apartment.maintenanceAmount });
  } catch (err) {
    console.error('Error fetching maintenance amount:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Resident submits payment request
router.post('/maintenance/payment', async (req, res) => {
  try {
    const { apartmentCode, flatNumber, transactionId } = req.body;
    if (!apartmentCode || !flatNumber || !transactionId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const apartment = await Apartment.findOne({ apartmentCode });
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
    const amount = apartment.maintenanceAmount;
    if (!amount) return res.status(400).json({ error: 'Maintenance amount not set by admin' });
    const payment = new MaintenancePayment({
      apartmentCode,
      flatNumber,
      amount,
      transactionId
    });
    await payment.save();
    res.status(201).json({ message: 'Payment request submitted', payment });
  } catch (err) {
    console.error('Error submitting payment request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Resident fetches their own payment requests
router.get('/maintenance/my-payments', async (req, res) => {
  try {
    const { apartmentCode, flatNumber } = req.query;
    if (!apartmentCode || !flatNumber) {
      return res.status(400).json({ error: 'apartmentCode and flatNumber are required' });
    }
    const payments = await MaintenancePayment.find({ apartmentCode, flatNumber }).sort({ createdAt: -1 });
    res.status(200).json({ payments });
  } catch (err) {
    console.error('Error fetching resident payments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin fetches all payment requests for their apartment
router.get('/maintenance/payments', async (req, res) => {
  try {
    const { apartmentCode } = req.query;
    if (!apartmentCode) return res.status(400).json({ error: 'apartmentCode is required' });
    const payments = await MaintenancePayment.find({ apartmentCode }).sort({ createdAt: -1 });
    res.status(200).json({ payments });
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Set or update bank details (admin)
router.post('/maintenance/bank-details', async (req, res) => {
  try {
    const { apartmentCode, bankDetails } = req.body;
    const apartment = await Apartment.findOneAndUpdate(
      { apartmentCode },
      { bankDetails },
      { new: true }
    );
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
    res.status(200).json({ message: 'Bank details updated', bankDetails: apartment.bankDetails });
  } catch (err) {
    console.error('Error updating bank details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get bank details (resident)
router.get('/maintenance/bank-details', async (req, res) => {
  try {
    const { apartmentCode } = req.query;
    const apartment = await Apartment.findOne({ apartmentCode });
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
    res.status(200).json({ bankDetails: apartment.bankDetails });
  } catch (err) {
    console.error('Error fetching bank details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin updates payment status
router.patch('/maintenance/payment/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const payment = await MaintenancePayment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment status updated', payment });
  } catch (err) {
    console.error('Error updating payment status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// -- Update Complaint Status
router.put("/update-complaint/:id", async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    const update = { status };
    if (assignedTo !== undefined) update.assignedTo = assignedTo;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint updated", complaint });
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ error: "Failed to update complaint" });
  }
});

// --- Utility: Fix old complaints missing user field ---
router.post('/fix-complaints-user', async (req, res) => {
  try {
    const complaints = await Complaint.find({ $or: [{ user: { $exists: false } }, { user: null }] });
    let updated = 0;
    for (const complaint of complaints) {
      if (!complaint.phoneNumber) continue;
      const user = await User.findOne({ phoneNumber: complaint.phoneNumber });
      if (user) {
        complaint.user = user._id;
        await complaint.save();
        updated++;
      }
    }
    res.status(200).json({ message: `Updated ${updated} complaints with user info.` });
  } catch (err) {
    console.error('Error fixing complaints:', err);
    res.status(500).json({ error: 'Failed to update complaints.' });
  }
});

module.exports = router;

