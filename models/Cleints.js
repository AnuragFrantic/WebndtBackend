const mongoose = require("mongoose")

const CleintsSchema = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    position: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cleint', CleintsSchema);