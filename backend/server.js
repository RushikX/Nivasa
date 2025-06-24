const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const technicianRoutes = require('./routes/technicianRoutes');
//const complaintRoutes = require('./routes/complaint');

app.use('/api/auth', authRoutes);
app.use('/api', technicianRoutes);
//app.use('/api/complaints', complaintRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
