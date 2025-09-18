const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');
const { authorizeRoles } = require('../middlewares/authMiddleware');
const { protect } = require('../middlewares/authMiddleware'); 

// List all orders (admin only)
router.get('/orders', protect, authorizeRoles('admin'), getAllOrders);

// Update order status (admin only)
router.patch('/orders/:id/status', protect, authorizeRoles('admin'), updateOrderStatus);

module.exports = router;
