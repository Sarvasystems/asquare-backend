const express = require('express');
const router = express.Router();
const commercialListingController = require('../controllers/commercialListing.controller');

router.post('/', commercialListingController.createCommercialListing);
router.get('/', commercialListingController.getCommercialListings);
router.get('/:id', commercialListingController.getCommercialListingById);
router.put('/:id', commercialListingController.updateCommercialListing);
router.delete('/:id', commercialListingController.deleteCommercialListing);

module.exports = router;
