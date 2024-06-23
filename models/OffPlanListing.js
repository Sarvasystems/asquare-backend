const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OffPlanListingSchema = new Schema({
  images: [String],
  title: String,
  rent: String,
  developer: {
    title: String,
    logo: String
  },
  location: String,
  information: {
    deliveryDate: Date,
    numberOfBuildings: Number,
    paymentPlan: String,
    governmentFees: Number,
    propertyType: String
  },
  description: String,
  paymentPlan: {
    downPayment: Number,
    duringConstruction: Number,
    onHandover: Number
  },
  projectTime: {
    projectAnnouncement: Date,
    constructionStarted: Date,
    expectedCompletion: Date
  },
  units: {
    apartment: [String]
  },
  masterplan: [String],
  amenities: [String]
});

module.exports = mongoose.model('OffPlanListing', OffPlanListingSchema);
