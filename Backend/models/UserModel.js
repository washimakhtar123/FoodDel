const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Changed from Number to String
    cartData: { type: Object, default: {} }, // Better default structure
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = userModel;
