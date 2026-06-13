const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobileNumber: String,
    role: String,
}, {
    timestamps: true,
    collection: 'users',
});

const user = mongoose.model('user', userSchema);
module.exports = user;