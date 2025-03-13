const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true }, // Changed from Number to String
    address: { type: Object, require:true }, 
    status: { type: String, default:"Food Processing" }, 
    date: { type: Date, default: Date.now() }, 
    payment: { type: Boolean, default: false }, 
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
module.exports = orderModel;
