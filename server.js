const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const offPlanListingRoutes = require('./routes/offPlanListing.route');
const rentalListingRoutes = require('./routes/rentalListing.route');
const commercialListingRoutes = require('./routes/commercialListing.route');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/offplanlistings', offPlanListingRoutes);
app.use('/api/rentallistings', rentalListingRoutes);
app.use('/api/commerciallistings', commercialListingRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
