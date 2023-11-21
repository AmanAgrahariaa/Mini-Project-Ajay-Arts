// Importing Mongoose for MongoDB schema creation
const mongoose = require('mongoose');

// Defining the category schema using Mongoose
const categorySchema = new mongoose.Schema({
  // Name of the category with a requirement for its presence
  name: {
    type: String,
    required: 'This field is required.'
  },
  // Image URL for the category with a requirement for its presence
  image: {
    type: String,
    required: 'This field is required.'
  },
});

// Exporting the Mongoose model for the 'Category' collection
module.exports = mongoose.model('Category', categorySchema);
