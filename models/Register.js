const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Register', RegisterSchema);