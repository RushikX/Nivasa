const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001; // Vercel will set its own PORT

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API routes
const authRoutes = require('./routes/auth');
const technicianRoutes = require('./routes/technicianRoutes');
// const complaintRoutes = require('./routes/complaint'); // if you have this

app.use('/api/auth', authRoutes);
app.use('/api', technicianRoutes);
// app.use('/api/complaints', complaintRoutes); // if you have this

// ✅ Serve static files for frontend (e.g. React build) if present
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Express error handler:', err.stack || err.message || err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app; // optional export for testing
