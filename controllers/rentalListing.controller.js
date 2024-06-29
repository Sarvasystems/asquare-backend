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


exports.searchAndFilterRentalListings = async (req, res) => {
  try {
    const { title, developer, location, community, minBeds, minBaths, propertyType, minPrice, maxPrice } = req.body;
    
    let filters = {};

    if (title) {
      filters.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }
    if (developer) {
      filters['developer.title'] = { $regex: developer, $options: 'i' };
    }
    if (location) {
      filters.location = { $regex: location, $options: 'i' };
    }
    if (community) {
      filters.community = { $regex: community, $options: 'i' };
    }
    if (minBeds) {
      filters.beds = { $gte: Number(minBeds) };
    }
    if (minBaths) {
      filters.baths = { $gte: Number(minBaths) };
    }
    if (propertyType) {
      filters.soldType = propertyType;
    }
    if (minPrice || maxPrice) {
      filters['transaction.soldFor.aed'] = {};
      if (minPrice) {
        filters['transaction.soldFor.aed'].$gte = Number(minPrice);
      }
      if (maxPrice) {
        filters['transaction.soldFor.aed'].$lte = Number(maxPrice);
      }
    }

    const rentalListings = await RentalListing.find(filters);
    res.status(200).json(rentalListings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.uploadImage = async (req, res) => {
  try {
    const rentalListingId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const rentalListing = await RentalListing.findById(rentalListingId);
    if (!rentalListing) {
      return res.status(404).json({ error: 'RentalListing not found' });
    }

    rentalListing.displayImages.push(imageUrl); // Add the image URL to displayImages
    await rentalListing.save();

    res.status(200).json({
      message: 'File uploaded and rental listing updated successfully',
      file: req.file,
      rentalListing
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};