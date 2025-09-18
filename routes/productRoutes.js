const express = require('express');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/authproducts');
const { protect } = require('../middlewares/authMiddleware');


router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.post('/', protect, createProduct);
router.patch('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;