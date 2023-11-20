const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Abstract','OilPainting', 'KajalArt', 'Pencil', 'Crayon'],
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
});

paintingSchema.index({ name: 'text', description: 'text' });
// // WildCard Indexing
// //paintingSchema.index({ "$**" : 'text' });

module.exports = mongoose.models.painting || mongoose.model('painting',paintingSchema);
