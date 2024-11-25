const SectorModal = require('../models/Sector');
const slugify = require('slugify');

// Create a new sector
exports.createSector = async (req, res) => {
    try {
        const data = { ...req.body };

        // If an image file is uploaded, add its path to the data
        if (req.file) {
            data.image = req.file.path;
        }

        // Generate a unique URL if title is provided
        if (data.title) {
            data.url = slugify(data.title, { lower: true, strict: true });
        }

        const sectorData = new SectorModal(data);
        await sectorData.save();

        res.status(201).json({ message: 'Sector created successfully', sectorData, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get all sectors
exports.getAllSector = async (req, res) => {
    try {
        const sectorData = await SectorModal.find();
        res.status(200).json({ data: sectorData, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single sector by URL
exports.getSectorByUrl = async (req, res) => {
    try {
        const sector = await SectorModal.findOne({ url: req.params.url });
        if (!sector) {
            return res.status(404).json({ message: 'Sector not found' });
        }
        res.status(200).json({ data: sector, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Update a sector by URL
exports.updateSector = async (req, res) => {
    try {
        const data = { ...req.body };

        // If an image file is uploaded, update the image path
        if (req.file) {
            data.image = req.file.path;
        }

        // Update URL if the title has changed
        if (data.title) {
            data.url = slugify(data.title, { lower: true, strict: true });
        }

        const sector = await SectorModal.findOneAndUpdate(
            { url: req.params.url },
            data,
            { new: true, runValidators: true }
        );

        if (!sector) {
            return res.status(404).json({ message: 'Sector not found' });
        }

        res.status(200).json({ message: 'Sector updated successfully', sector, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};


exports.deleteSector = async (req, res) => {
    try {
        const sector = await SectorModal.findOneAndDelete({ url: req.params.url });
        if (!sector) {
            return res.status(404).json({ message: 'Sector not found' });
        }
        res.status(200).json({ message: 'Sector deleted successfully', error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
