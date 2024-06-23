const express = require('express');
const router = express.Router();
const rentalListingController = require('../controllers/rentalListing.controller');

router.post('/', rentalListingController.createRentalListing);
router.get('/', rentalListingController.getRentalListings);
router.get('/:id', rentalListingController.getRentalListingById);
router.put('/:id', rentalListingController.updateRentalListing);
router.delete('/:id', rentalListingController.deleteRentalListing);

module.exports = router;
