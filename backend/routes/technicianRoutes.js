const express = require('express');
const router = express.Router();
const Technician = require('../models/Technician');

// GET all technicians
router.get('/all-technicians', async (req, res) => {
    try {
        const technicians = await Technician.find().sort({ createdAt: -1 });
        res.status(200).json(technicians);
    } catch (error) {
        console.error('Error fetching technicians:', error);
        res.status(500).json({ error: 'Failed to fetch technicians' });
    }
});

// GET technician by ID
router.get('/technicians/:id', async (req, res) => {
    try {
        const technician = await Technician.findById(req.params.id);
        if (!technician) {
            return res.status(404).json({ error: 'Technician not found' });
        }
        res.status(200).json(technician);
    } catch (error) {
        console.error('Error fetching technician:', error);
        res.status(500).json({ error: 'Failed to fetch technician' });
    }
});

// POST add new technician
router.post('/add-technicians', async (req, res) => {
    try {
        const { name, email, phone, specialty, status } = req.body;

        console.log('Received technician data:', { name, email, phone, specialty, status });

        // Validation
        if (!name || !email || !phone || !specialty) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'Name, email, phone, and specialty are required' });
        }

        // Check if email already exists
        const existingTechnician = await Technician.findOne({ email });
        if (existingTechnician) {
            console.log('Validation failed: Email already exists');
            return res.status(400).json({ error: 'Technician with this email already exists' });
        }

        // Create new technician
        const technician = new Technician({
            name,
            email,
            phone,
            specialty,
            status: status || 'available'
        });

        console.log('Saving technician to database...');
        await technician.save();
        console.log('Technician saved successfully:', technician._id);

        res.status(201).json(technician);
    } catch (error) {
        console.error('Error adding technician:', error);
        if (error.name === 'ValidationError') {
            console.log('Validation error details:', error.message);
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to add technician' });
    }
});

// PATCH update technician status
router.patch('/technicians/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !['available', 'busy', 'offline'].includes(status)) {
            return res.status(400).json({ error: 'Valid status is required (available, busy, offline)' });
        }

        const updatedTechnician = await Technician.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedTechnician) {
            return res.status(404).json({ error: 'Technician not found' });
        }

        res.status(200).json(updatedTechnician);
    } catch (error) {
        console.error('Error updating technician status:', error);
        res.status(500).json({ error: 'Failed to update technician status' });
    }
});

// PUT update technician
router.put('/technicians/:id', async (req, res) => {
    try {
        const { name, email, phone, specialty, status } = req.body;

        // Check if email already exists for different technician
        if (email) {
            const existingTechnician = await Technician.findOne({
                email,
                _id: { $ne: req.params.id }
            });
            if (existingTechnician) {
                return res.status(400).json({ error: 'Technician with this email already exists' });
            }
        }

        const updatedTechnician = await Technician.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, specialty, status },
            { new: true, runValidators: true }
        );

        if (!updatedTechnician) {
            return res.status(404).json({ error: 'Technician not found' });
        }

        res.status(200).json(updatedTechnician);
    } catch (error) {
        console.error('Error updating technician:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to update technician' });
    }
});

// DELETE technician
router.delete('/technicians/:id', async (req, res) => {
    try {
        const technician = await Technician.findByIdAndDelete(req.params.id);

        if (!technician) {
            return res.status(404).json({ error: 'Technician not found' });
        }

        res.status(200).json({
            message: 'Technician deleted successfully',
            deletedTechnician: technician
        });
    } catch (error) {
        console.error('Error deleting technician:', error);
        res.status(500).json({ error: 'Failed to delete technician' });
    }
});

// GET technicians by specialty
router.get('/technicians/specialty/:specialty', async (req, res) => {
    try {
        const { specialty } = req.params;
        const technicians = await Technician.find({
            specialty: { $regex: specialty, $options: 'i' }
        }).sort({ createdAt: -1 });

        res.status(200).json(technicians);
    } catch (error) {
        console.error('Error fetching technicians by specialty:', error);
        res.status(500).json({ error: 'Failed to fetch technicians' });
    }
});

// GET available technicians
router.get('/technicians/status/available', async (req, res) => {
    try {
        const technicians = await Technician.find({ status: 'available' }).sort({ createdAt: -1 });
        res.status(200).json(technicians);
    } catch (error) {
        console.error('Error fetching available technicians:', error);
        res.status(500).json({ error: 'Failed to fetch available technicians' });
    }
});

module.exports = router; 