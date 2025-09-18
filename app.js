const express = require('express');
const dotenv = require('dotenv');
const app = express();
// Load environment variables as early as possible
dotenv.config();
// DB connection
const connectDB = require('./config/db');
connectDB();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const adminOrderRoutes = require('./routes/adminOrders');
// Error handler
const errorHandler = require('./middleware/errorHandler');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running sucessfully'})
});

// Security middleware
app.use(helmet());
app.use(mongoSanitize()); // prevent NoSQL injection
app.use(xss()); // prevent XSS

const limiter = rateLimit({
    windowMs: 50 * 60 * 1000, // 50 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// A simple health check route to confirm the API is live
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(express.json());
app.use('/api/', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminOrderRoutes); 

// ✅ Global error handler
app.use(errorHandler);

module.exports = app;