const express = require('express');
const router = express.Router();
const { addProductToCart, getCart, removeProductFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/add', protect, addProductToCart);
router.get('/', protect, getCart);
router.delete('/remove/:id', protect, removeProductFromCart);

module.exports = router;