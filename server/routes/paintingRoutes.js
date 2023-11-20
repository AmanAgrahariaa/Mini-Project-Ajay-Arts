const express = require('express');
const router = express.Router();
const paintingController = require('../controllers/paintingController');

/**
 * App Routes 
*/
router.get('/', paintingController.homepage);
router.get('/painting/:id', paintingController.explorePainting);
router.get('/categories', paintingController.exploreCategories);
router.get('/categories/:id', paintingController.exploreCategoriesById);
router.post('/search', paintingController.searchPainting);
router.get('/explore-latest', paintingController.exploreLatest);
router.get('/submit-painting', paintingController.submitPainting);
router.post('/submit-painting', paintingController.submitPaintingOnPost);
router.get('/about', paintingController.about);
router.get('/contact', paintingController.contact);

module.exports = router;