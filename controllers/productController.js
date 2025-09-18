const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.ststus(400).json({ message: error.message });
    }
    };

exports.getProduct = async (req, res) => {
    try{ 
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product nof found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateproduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};
 
exports.deleteProduct = async (req, res) => {
    try{
        await Product.findByIdAndUpdate(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch {error} {
        res.status(400).json({ message: error.message });
    }
};