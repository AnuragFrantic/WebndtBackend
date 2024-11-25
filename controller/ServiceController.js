const Service = require('../models/ServiceModel');

exports.createService = async (req, res) => {
    try {
        const serviceData = { ...req.body };

        // Handle image and icon uploads
        if (req.files && req.files.image) {
            serviceData.image = req.files.image[0].path;
        }
        if (req.files && req.files.icon) {
            serviceData.icon = req.files.icon[0].path;
        }

        const service = new Service(serviceData);
        await service.save();

        res.status(201).json({ message: "Service created successfully", data: service, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ data: services, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

exports.getServiceByUrl = async (req, res) => {
    try {
        const { url } = req.params;
        const service = await Service.findOne({ url });
        if (!service) {
            return res.status(404).json({ message: "Service not found", error: 1 });
        }
        res.status(200).json({ data: service, error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { url } = req.params;
        const updatedData = { ...req.body };

        // Handle updated files dynamically
        if (req.files && req.files.image) {
            updatedData.image = req.files.image[0].path;
        }
        if (req.files && req.files.icon) {
            updatedData.icon = req.files.icon[0].path;
        }

        const service = await Service.findOneAndUpdate({ url }, updatedData, { new: true });
        if (!service) {
            return res.status(404).json({ message: "Service not found", error: 1 });
        }

        res.status(200).json({ message: "Service updated successfully", data: service, error: 0 });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { url } = req.params;
        const service = await Service.findOneAndDelete({ url });
        if (!service) {
            return res.status(404).json({ message: "Service not found", error: 1 });
        }
        res.status(200).json({ message: "Service deleted successfully", error: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 1 });
    }
};
