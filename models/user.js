const mongoose = require("mongoose");

// user model
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        required: true,
        min:3
    },
    fullname: {
        type: String,
        required: true,
        min:3
    },
    password: {
        type: String,
        required: true,
        min:8
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('userSchema', userSchema);