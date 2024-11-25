const SectorDetail = require('../models/SectorDetail');
const Sector = require('../models/Sector');  // To fetch sector by URL


// Create a new sector detail
exports.createSectorDetail = async (req, res) => {
    try {
        const data = { ...req.body };

        // Validate if the sector exists
        const existingSector = await Sector.findById(data.sector);
        if (!existingSector) {
            return res.status(404).json({ message: 'Sector not found', error: 1 });
        }

        const sectorDetail = new SectorDetail(data);
        await sectorDetail.save();

        res.status(201).json({ message: 'SectorDetail created successfully', sectorDetail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get all sector details
exports.getAllSectorDetails = async (req, res) => {
    try {
        const sectorDetails = await SectorDetail.find().populate('sector');
        res.status(200).json({ data: sectorDetails, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get sector detail by ID
exports.getSectorDetailById = async (req, res) => {
    try {
        const sectorDetail = await SectorDetail.findById(req.params.id).populate('sector');
        if (!sectorDetail) {
            return res.status(404).json({ message: 'Sector Detail not found' });
        }
        res.status(200).json({ data: sectorDetail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update sector detail by ID
exports.updateSectorDetail = async (req, res) => {
    try {
        const data = { ...req.body };

        const sectorDetail = await SectorDetail.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true, runValidators: true }
        ).populate('sector');

        if (!sectorDetail) {
            return res.status(404).json({ message: 'SectorDetail not found' });
        }

        res.status(200).json({ message: 'SectorDetail updated successfully', sectorDetail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Delete sector detail by ID
exports.deleteSectorDetail = async (req, res) => {

    try {

        const sectorDetail = await SectorDetail.findByIdAndDelete(req.params.id);
    
        if (!sectorDetail) {
            return res.status(200).json({ message: 'SectorDetail not found' });
        }
        res.status(200).json({ message: 'SectorDetail deleted successfully', error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get sector detail by sector URL
exports.getSectorDetailBySectorUrl = async (req, res) => {
    try {
        // Find sector by URL
        const sector = await Sector.findOne({ url: req.params.url });
        if (!sector) {
            return res.status(404).json({ message: 'Sector not found' });
        }

        // Fetch sector details based on sector ID
        const sectorDetail = await SectorDetail.findOne({ sector: sector._id }).populate('sector');
        if (!sectorDetail) {
            return res.status(404).json({ message: 'Sector detail not found for this sector' });
        }

        res.status(200).json({ data: sectorDetail, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
