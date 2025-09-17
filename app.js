const express = require('express');
const dotenv = require('dotenv');
const app = express();
// Load environment variables as early as possible
dotenv.config();
// DB connection
const connectDB = require('./config/db');
connectDB();
const authRoutes = require('./routes/authRoutes');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running sucessfully'})
});

// A simple health check route to confirm the API is live
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(express.json());
app.use('/api/auth', authRoutes)

module.exports = app;