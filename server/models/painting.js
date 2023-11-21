// Importing Mongoose for MongoDB schema creation
const mongoose = require('mongoose');

// Defining the painting schema using Mongoose
const paintingSchema = new mongoose.Schema({
  // Category of the painting with enum validation
  category: {
    type: String,
    enum: ['Abstract', 'OilPainting', 'KajalArt', 'Pencil', 'Crayon'],
    required: 'This field is required.'
  },
  // Image URL for the painting with a requirement for its presence
  image: {
    type: String,
    required: 'This field is required.'
  },
});

// Creating a text index for full-text search on 'name' and 'description' fields
paintingSchema.index({ name: 'text', description: 'text' });

// // WildCard Indexing (Example commented out)
// // paintingSchema.index({ "$**" : 'text' });

// Exporting the Mongoose model for the 'painting' collection
// If the model already exists, use it; otherwise, create a new model
module.exports = mongoose.models.painting || mongoose.model('painting', paintingSchema);
