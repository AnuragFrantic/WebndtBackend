const mongoose = require("mongoose");
const slugify = require("slugify");

const SectorSchema = new mongoose.Schema({
    title: { type: String, },
    description: { type: String, },
    image: { type: String },
    url: { type: String, unique: true }
});

// Middleware to generate a unique URL before saving
SectorSchema.pre('save', function (next) {
    if (this.title) {
        this.url = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Sector = mongoose.model("Sector", SectorSchema);

module.exports = Sector;
