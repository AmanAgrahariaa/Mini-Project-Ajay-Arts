// Importing necessary modules and models
require('../models/database');
const Category = require('../models/Category');
const Painting = require('../models/painting');

// Controller functions for different routes

/**
 * About Page Route
 */
exports.about = async (req, res) => {
  res.render('about', { title: 'Painting - About' });
}

/**
 * Contact Page Route
 */
exports.contact = async (req, res) => {
  res.render('contact', { title: 'Painting - Contact' });
}

/**
 * Home Page Route
 */
exports.homepage = async (req, res) => {
  try {
    // Retrieve data for homepage, including categories and latest paintings
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Painting.find({}).sort({ _id: -1 }).limit(limitNumber);
    const Abstract = await Painting.find({ 'category': 'Abstract' }).limit(limitNumber);
    const OilPainting = await Painting.find({ 'category': 'OilPainting' }).limit(limitNumber);
    const PencilArt = await Painting.find({ 'category': 'Pencil' }).limit(limitNumber);

    const art = { latest, Abstract, OilPainting, PencilArt };

    // Render the homepage view with the retrieved data
    res.render('index', { title: 'Painting - Home', categories, art });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}

/**
 * Explore Categories Route
 */
exports.exploreCategories = async (req, res) => {
  try {
    // Retrieve and render data for exploring categories
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Painting - Categories', categories });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}

/**
 * Explore Categories by ID Route
 */
exports.exploreCategoriesById = async (req, res) => {
  try {
    // Retrieve and render data for exploring categories by ID
    let categoryId = req.params.id;
    const limitNumber = 10;
    const categoryById = await Painting.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Painting - Categories', categoryById });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}

/**
 * Explore Painting Route
 */
exports.explorePainting = async (req, res) => {
  try {
    // Retrieve and render data for exploring a specific painting
    let paintingId = req.params.id;
    const painting = await Painting.findById(paintingId);
    res.render('painting', { title: 'Painting', painting });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}

/**
 * Search Painting Route (POST request)
 */
exports.searchPainting = async (req, res) => {
  try {
    // Retrieve and render data for searching paintings
    let searchTerm = req.body.searchTerm;
    let painting = await Painting.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Painting - Search', painting });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}

/**
 * Explore Latest Paintings Route
 */
exports.exploreLatest = async (req, res) => {
  try {
    // Retrieve and render data for exploring the latest paintings
    const limitNumber = 10;
    const painting = await Painting.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Painting - Explore Latest', painting });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
}

/**
 * Submit Painting Page Route
 */
exports.submitPainting = async (req, res) => {
  // Retrieve flash messages for displaying information/errors
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');

  // Render the submit-painting view with flash messages
  res.render('submit-painting', { title: 'Painting - Submit Painting', infoErrorsObj, infoSubmitObj });
}

/**
 * Submit Painting Form Handling (POST request)
 */
exports.submitPaintingOnPost = async (req, res) => {
  try {
    // Handling file upload for the painting image
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('No Files were uploaded.');
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    // Creating a new painting instance and saving it to the database
    const newPainting = new Painting({
      category: req.body.category,
      image: newImageName,
    });
    
    await newPainting.save();

    // Redirecting to the submit-painting page with success flash message
    req.flash('infoSubmit', 'Painting has been added.')
    res.redirect('/submit-painting');
  } catch (error) {
    // Handling errors and redirecting to the submit-painting page with error flash message
    console.log(error.message);
    req.flash('infoErrors', error);
    res.redirect('/submit-painting');
  }
}

// Function to insert dummy category data (commented out for reference)
async function insertDummyCategoryData() {
  try {
    await Category.insertMany([
      {
        "name": "Abstract",
        "image": "abstract1.jpg"
      },
      {
        "name": "OilPainting",
        "image": "oilpainting.jpg"
      },
      {
        "name": "Pencil",
        "image": "pencil.jpg"
      },
      {
        "name": "KajalArt",
        "image": "kajal.jpg"
      },
      {
        "name": "Crayon",
        "image": "crayon.jpg"
      }
    ]);
  } catch (error) {
    console.log('Error: ' + error)
  }
}

// Uncomment the line below to insert dummy category data
// insertDummyCategoryData();
