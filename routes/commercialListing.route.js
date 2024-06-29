const express = require('express');
const router = express.Router();
const commercialListingController = require('../controllers/commercialListing.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, commercialListingController.createCommercialListing);
router.get('/', commercialListingController.getCommercialListings);
router.get('/:id', commercialListingController.getCommercialListingById);
router.put('/:id', authMiddleware, commercialListingController.updateCommercialListing);
router.delete('/:id', authMiddleware, commercialListingController.deleteCommercialListing);

module.exports = router;
