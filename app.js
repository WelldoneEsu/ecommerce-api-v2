const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
// Load environment variables as early as possible
dotenv.config();
// DB connection
const connectDB = require('./config/db');
connectDB();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
/*const mongoSanitize = require('express-mongo-sanitize');*/
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
// Error handler
const errorHandler = require('./middlewares/errorHandler');

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running sucessfully'})
});

// Middleware
app.use(cors()); 
app.use(express.json());

// Security middleware
app.use(helmet());
/*app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);// prevent NoSQL injection*/


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


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/admin', adminOrderRoutes); 

// Serve public frontend folder
app.use(express.static('public'));

// ✅ Global error handler
app.use(errorHandler);

module.exports = app;