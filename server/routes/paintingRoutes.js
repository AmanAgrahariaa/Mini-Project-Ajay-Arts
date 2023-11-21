// Importing necessary modules
const express = require('express');
const router = express.Router();
const paintingController = require('../controllers/paintingController');

/**
 * App Routes
 */

// Home Page Route
router.get('/', paintingController.homepage);

// Explore Painting Route
router.get('/painting/:id', paintingController.explorePainting);

// Explore Categories Route
router.get('/categories', paintingController.exploreCategories);

// Explore Categories by ID Route
router.get('/categories/:id', paintingController.exploreCategoriesById);

// Search Painting Route (POST request)
router.post('/search', paintingController.searchPainting);

// Explore Latest Paintings Route
router.get('/explore-latest', paintingController.exploreLatest);

// Submit Painting Page Route
router.get('/submit-painting', paintingController.submitPainting);

// Submit Painting Form Handling (POST request)
router.post('/submit-painting', paintingController.submitPaintingOnPost);

// About Page Route
router.get('/about', paintingController.about);

// Contact Page Route
router.get('/contact', paintingController.contact);

// Exporting the router for use in the main application
module.exports = router;
