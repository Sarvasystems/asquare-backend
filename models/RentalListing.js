const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentalListingSchema = new Schema({
  displayImages: [String],
  title: String,
  price: Number,
  propertyType: String,
  furnishing: String,
  tagline: String,
  developer: {
    title: String,
    logo: String
  },
  availableFrom: Date,
  location: String,
  community: String,
  baths: String,
  beds: String,
  soldType: String,
  description: String,
  amenities: [String],
  transaction: {
    soldFor: [{
      date: Date,
      aed: Number,
      area: Number
    }],
    rentedFor: [{
      date: Date,
      aed: Number,
      area: Number
    }]
  },
  priceTrends: [String], // Assuming format "month:price" stored as a string
  regulatoryInformation: {
    reference: String,
    listed: String,
    brokerOrn: String,
    zoneName: String,
    dldPermitNumber: String,
    barcode: String
  }
});

module.exports = mongoose.model('RentalListing', RentalListingSchema);
