const Cleint = require("../models/Cleints"); // Adjust the path based on your folder structure

// Create a new client
exports.createCleint = async (req, res) => {
    try {
        const data = req.body; // Dynamically take fields from request body
        if (req.file) {
            data.image = req.file.path; // Add file path if an image is uploaded
        }

        const cleint = new Cleint(data);
        await cleint.save();

        res.status(201).json({ message: "Client created successfully", data: cleint, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

// Get all clients
exports.getAllCleints = async (req, res) => {
    try {
        const cleints = await Cleint.find();
        res.status(200).json({ data: cleints, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

// Get a single client by ID
exports.getCleintById = async (req, res) => {
    try {
        const { id } = req.params;
        const cleint = await Cleint.findById(id);

        if (!cleint) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(cleint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a client by ID
exports.updateCleint = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body; // Dynamically take fields from request body
        if (req.file) {
            data.image = req.file.path; // Add file path if an image is uploaded
        }

        const cleint = await Cleint.findByIdAndUpdate(id, data, { new: true });

        if (!cleint) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ message: "Client updated successfully", cleint });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a client by ID
exports.deleteCleint = async (req, res) => {
    try {
        const { id } = req.params;
        const cleint = await Cleint.findByIdAndDelete(id);

        if (!cleint) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
