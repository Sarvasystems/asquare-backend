const express = require('express');
const router = express.Router();
const offPlanListingController = require('../controllers/offPlanListing.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, offPlanListingController.createOffPlanListing);
router.get('/', offPlanListingController.getOffPlanListings);
router.get('/:id', offPlanListingController.getOffPlanListingById);
router.put('/:id', authMiddleware, offPlanListingController.updateOffPlanListing);
router.delete('/:id', authMiddleware, offPlanListingController.deleteOffPlanListing);

module.exports = router;
