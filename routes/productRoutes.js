const express = require('express');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const productSchema = require('../validators/productValidator');
const productUpdateSchema = require('../validators/productValidateUpdator'); 

router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
//  Admin-only product management routes
router.post('/', protect, authorizeRoles('admin'), validate(productSchema), createProduct);
router.patch('/:id', protect, authorizeRoles('admin'), validate(productUpdateSchema), updateProduct);
router.delete('/:id', protect, authorizeRoles('admin'), deleteProduct);


module.exports = router;