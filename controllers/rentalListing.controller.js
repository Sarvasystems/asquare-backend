const RentalListing = require('../models/RentalListing');

exports.createRentalListing = async (req, res) => {
  try {
    const rentalListing = new RentalListing(req.body);
    await rentalListing.save();
    res.status(201).json(rentalListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRentalListings = async (req, res) => {
  try {
    const rentalListings = await RentalListing.find();
    res.status(200).json(rentalListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRentalListingById = async (req, res) => {
  try {
    const rentalListing = await RentalListing.findById(req.params.id);
    if (!rentalListing) return res.status(404).json({ error: 'RentalListing not found' });
    res.status(200).json(rentalListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRentalListing = async (req, res) => {
  try {
    const rentalListing = await RentalListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!rentalListing) return res.status(404).json({ error: 'RentalListing not found' });
    res.status(200).json(rentalListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRentalListing = async (req, res) => {
  try {
    const rentalListing = await RentalListing.findByIdAndDelete(req.params.id);
    if (!rentalListing) return res.status(404).json({ error: 'RentalListing not found' });
    res.status(200).json({ message: 'RentalListing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
