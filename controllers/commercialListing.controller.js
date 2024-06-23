const CommercialListing = require('../models/CommercialListing');

exports.createCommercialListing = async (req, res) => {
  try {
    const commercialListing = new CommercialListing(req.body);
    await commercialListing.save();
    res.status(201).json(commercialListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommercialListings = async (req, res) => {
  try {
    const commercialListings = await CommercialListing.find();
    res.status(200).json(commercialListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommercialListingById = async (req, res) => {
  try {
    const commercialListing = await CommercialListing.findById(req.params.id);
    if (!commercialListing) return res.status(404).json({ error: 'CommercialListing not found' });
    res.status(200).json(commercialListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCommercialListing = async (req, res) => {
  try {
    const commercialListing = await CommercialListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!commercialListing) return res.status(404).json({ error: 'CommercialListing not found' });
    res.status(200).json(commercialListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCommercialListing = async (req, res) => {
  try {
    const commercialListing = await CommercialListing.findByIdAndDelete(req.params.id);
    if (!commercialListing) return res.status(404).json({ error: 'CommercialListing not found' });
    res.status(200).json({ message: 'CommercialListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
