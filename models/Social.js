const mongoose = require("mongoose")


const SocialSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    value: { type: String }
})


module.exports = mongoose.model('Social', SocialSchema);