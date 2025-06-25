const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001; // Vercel will set its own PORT

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'https://*.railway.app', 'https://*.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('🔗 Database URL:', process.env.MONGO_URI ? 'Set' : 'Not set');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.error('🔗 Database URL:', process.env.MONGO_URI ? 'Set' : 'Not set');
  });

// Add connection status check
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// API routes
const authRoutes = require('./routes/auth');
const technicianRoutes = require('./routes/technicianRoutes');
// const complaintRoutes = require('./routes/complaint'); // if you have this

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api', technicianRoutes);
// app.use('/api/complaints', complaintRoutes); // if you have this

// ✅ Serve static files for frontend (e.g. React build) if present
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Fallback to index.html for client-side routing (only for non-API routes)
app.get('*', (req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
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
