// Importing Mongoose for MongoDB connection
const mongoose = require("mongoose");

// Connection function to establish a MongoDB connection
const Connection = () => {
  // Setting strict query mode for Mongoose
  mongoose.set('strictQuery', true);

  // Connecting to MongoDB using the provided URI
  mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Connection successful."))
    .catch((err) => console.log(err));
}

// Calling the Connection function to establish the MongoDB connection
Connection();

// Importing Models
// Note: Make sure the models are defined in the respective files (Category.js and painting.js)
require('./Category');
require('./painting');
