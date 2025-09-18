const express = require('express');
const router = express.Router();
const { checkout, getOrders, getOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/checkout', protect, checkout);
router.get('/', protect, getOrders);
router.delete('/:id', protect, getOrder);

module.exports = router;