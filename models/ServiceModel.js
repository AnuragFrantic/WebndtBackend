const mongoose = require("mongoose");
const slugify = require("slugify");

const ServiceSchema = new mongoose.Schema({
    title: { type: String, },
    short_description: { type: String },
    description: { type: String, },
    image: { type: String },
    icon: { type: String },
    url: { type: String, unique: true }
});

// Middleware to generate a unique URL before saving
ServiceSchema.pre('save', function (next) {
    if (this.title) {
        this.url = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
