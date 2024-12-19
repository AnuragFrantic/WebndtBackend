const mongoose = require("mongoose")

const AboutUsSchema = mongoose.Schema({
    title: { type: String },
    year: { type: String },
    image: { type: String },
    description: { type: String },
    short_description: { type: String },
})

module.exports = mongoose.model("AboutUs", AboutUsSchema);