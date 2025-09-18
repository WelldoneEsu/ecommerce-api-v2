const simulatePayment = async () => {
    const success = Math.random() < 0.8; //80% success rate
    if (success) {
        return { success: true, message: 'Payment successful'};
    } else {
        return { success: false, message: 'Payment failed'};
    }
};

module.exports = simulatePayment;