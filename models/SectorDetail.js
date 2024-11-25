const mongoose = require('mongoose');

// Define the SectorDetail schema
const SectorDetailSchema = new mongoose.Schema({
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector',  // Reference to the 'Sector' model
        required: true,
    },
    detail: { type: String },
    additionalInfo: { type: String },
    title: { type: String },
    shortdescription: { type: String },


}, { timestamps: true });

const SectorDetail = mongoose.model('SectorDetail', SectorDetailSchema);
module.exports = SectorDetail;