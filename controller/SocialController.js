const Social = require("../models/Social"); // Adjust the path based on your project structure

// Create a new social item
exports.createSocial = async (req, res) => {
    try {
        const data = req.body; // Dynamically take fields from request body
        if (req.file) {
            data.image = req.file.path; // If an image is uploaded, save the path
        }

        const social = new Social(data);
        await social.save();

        res.status(201).json({ message: "Social item created successfully", social });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all social items
exports.getAllSocials = async (req, res) => {
    try {
        const socials = await Social.find();
        res.status(200).json(socials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single social item by ID
exports.getSocialById = async (req, res) => {
    try {
        const { id } = req.params;
        const social = await Social.findById(id);

        if (!social) {
            return res.status(404).json({ message: "Social item not found" });
        }

        res.status(200).json(social);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a social item by ID
exports.updateSocial = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body; // Dynamically take fields from request body
        if (req.file) {
            data.image = req.file.path; // If an image is uploaded, save the path
        }

        const social = await Social.findByIdAndUpdate(id, data, { new: true });

        if (!social) {
            return res.status(404).json({ message: "Social item not found" });
        }

        res.status(200).json({ message: "Social item updated successfully", social });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a social item by ID
exports.deleteSocial = async (req, res) => {
    try {
        const { id } = req.params;
        const social = await Social.findByIdAndDelete(id);

        if (!social) {
            return res.status(404).json({ message: "Social item not found" });
        }

        res.status(200).json({ message: "Social item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
