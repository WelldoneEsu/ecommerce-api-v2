const express = require('express');
const router = express.Router();
const { addProductToCart, getCart, removeItemFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const cartSchema = require('../validators/cartValidator');

router.post('/add', protect, validate(cartSchema), addProductToCart);
router.get('/', protect, getCart);
router.delete('/remove/:id', protect, removeItemFromCart);

module.exports = router;