require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./mongo');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const status = {
    status: mongoStatus === 1 ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    mongoDB: {
      status: mongoStatus === 1 ? 'connected' : 'disconnected',
      readyState: mongoStatus
    }
  };
  res.json(status);
});

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connection established successfully');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle MongoDB connection errors
  if (err.name === 'MongoServerError') {
    return res.status(503).json({ 
      message: 'Database connection error. Please try again later.' 
    });
  }
  
  // Handle other errors
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
