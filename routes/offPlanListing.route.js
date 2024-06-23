const express = require('express');
const router = express.Router();
const offPlanListingController = require('../controllers/offPlanListing.controller');

router.post('/', offPlanListingController.createOffPlanListing);
router.get('/', offPlanListingController.getOffPlanListings);
router.get('/:id', offPlanListingController.getOffPlanListingById);
router.put('/:id', offPlanListingController.updateOffPlanListing);
router.delete('/:id', offPlanListingController.deleteOffPlanListing);

module.exports = router;
