
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const simulatePayment = require('../utils/payments');

exports.checkout = async(req, res) => {
    try {
        // Find the user's cart by their userId from the JWT
        const cart = await Cart.findOne({ userId: req.user.userId});
        if(!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        } //Calculate the total price of all products in the cart
        const total = cart.products.reduce((acc, product) => {
            return acc + product.quantity * product.price;
        }, 0);
        const order = new Order ({
            userId: req.user.userId,
            products: cart.products, // copy cart products into the order
            total,
            status: 'pending',
        });
        await order.save();
        // Run the payment simulation (80% chance success)
        const paymentResult = await simulatePayment();
        if (paymentResult.success) {
            order.status = 'paid';
            await order.save();
        // Clear the cart after successful payment
        cart.products = []; // Option 1: Empty the products array
         await cart.save();
            res.json(order);
        } else {
            // If payment fails, order stays as pending/failed
         order.status = 'failed';
         await order.save();
            res.status(400).json({ message: paymentResult.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders for the logged-in user
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
};

// Get a single order by ID
exports.getorder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
