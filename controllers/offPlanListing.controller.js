const OffPlanListing = require('../models/OffPlanListing');

exports.createOffPlanListing = async (req, res) => {
  try {
    const offPlanListing = new OffPlanListing(req.body);
    await offPlanListing.save();
    res.status(201).json(offPlanListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOffPlanListings = async (req, res) => {
  try {
    const offPlanListings = await OffPlanListing.find();
    res.status(200).json(offPlanListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOffPlanListingById = async (req, res) => {
  try {
    const offPlanListing = await OffPlanListing.findById(req.params.id);
    if (!offPlanListing) return res.status(404).json({ error: 'OffPlanListing not found' });
    res.status(200).json(offPlanListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOffPlanListing = async (req, res) => {
  try {
    const offPlanListing = await OffPlanListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!offPlanListing) return res.status(404).json({ error: 'OffPlanListing not found' });
    res.status(200).json(offPlanListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOffPlanListing = async (req, res) => {
  try {
    const offPlanListing = await OffPlanListing.findByIdAndDelete(req.params.id);
    if (!offPlanListing) return res.status(404).json({ error: 'OffPlanListing not found' });
    res.status(200).json({ message: 'OffPlanListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
