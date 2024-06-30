const express = require('express');
const router = express.Router();
const rentalListingController = require('../controllers/rentalListing.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/uploadConfig');

router.post('/', rentalListingController.createRentalListing);
router.get('/', rentalListingController.getRentalListings);
router.get('/:id', rentalListingController.getRentalListingById);
router.put('/:id', authMiddleware, rentalListingController.updateRentalListing);
router.delete('/:id', authMiddleware, rentalListingController.deleteRentalListing);
router.post('/search', rentalListingController.searchAndFilterRentalListings); 
router.post('/upload/:id', upload, rentalListingController.uploadImage);

module.exports = router;
