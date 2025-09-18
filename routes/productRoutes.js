const express = require('express');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/authorizeRoles');
const validate = require('../validators/validate');
const productSchema = require('../validators/productValidator');
const productUpdateSchema = require('../validators/productUpdateValidator'); 

router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
//  Admin-only product management routes
router.post('/', protect, authorizedRole('admin'), validate(productSchema), createProduct);
router.patch('/:id', protect, authorizedRole('admin'), validate(productUpdateSchema), updateProduct);
router.delete('/:id', protect, authorizedRole('admin'), deleteProduct);


module.exports = router;