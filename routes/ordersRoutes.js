const express = require('express');
const router = express.Router();
const { checkout, getOrders, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/checkout', protect, checkout);
router.get('/', protect, getOrders);
router.delete('/:id', protect, deleteOrder);

module.exports = router;