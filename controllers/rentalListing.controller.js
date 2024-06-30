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
    const { page = 1} = req.query;
    const limit = 2;
    const rentalListings = await RentalListing.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await RentalListing.countDocuments();

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      rentalListings
    });
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
    const { 
      title, developer, location, community, minBeds, minBaths, 
      propertyType, minPrice, maxPrice, soldType 
    } = req.body;

    const { page = 1 } = req.query;
    const limit = 2;
    let filters = {};

    if (title) {
      filters.title = { $regex: title, $options: 'i' }; 
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
      filters.propertyType = propertyType;
    }
    if (soldType) {
      filters.soldType = soldType;
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filters.price.$lte = Number(maxPrice);
      }
    }

    const rentalListings = await RentalListing.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await RentalListing.countDocuments(filters);

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      rentalListings
    });
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

    rentalListing.displayImages.push(imageUrl); 
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