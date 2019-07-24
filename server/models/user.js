const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    password: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;