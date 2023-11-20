require('../models/database');
const Category = require('../models/Category');
const Painting = require('../models/painting');




exports.about = async(req, res) => {
  res.render('about', { title: 'Painting - About' } );
}


exports.contact = async(req, res) => {
  res.render('contact', { title: 'Painting - Contact' } );
}


/**
 * GET /
 * Homepage 
*/
exports.homepage = async(req,res) => {
  try {
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Painting.find({}).sort({_id: -1}).limit(limitNumber);
    
    const Abstract = await Painting.find({ 'category': 'Abstract' }).limit(limitNumber);
    const OilPainting = await Painting.find({ 'category': 'OilPainting' }).limit(limitNumber);
    const PencilArt = await Painting.find({ 'category': 'Pencil' }).limit(limitNumber);

    const art = { latest, Abstract, OilPainting, PencilArt};

    res.render('index', { title: 'Painting - Home', categories, art} );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 10;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Painting - Categoreis', categories } );
  } catch (error) {

    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 10;
    const categoryById = await Painting.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Painting - Categoreis', categoryById } );
  } catch (error) {

    res.satus(500).send({message: error.message || "Error Occured" });
  }
}
 
/**
 * GET /painting/:id
 * painting 
*/
exports.explorePainting = async(req, res) => {
  try {
    let paintingId = req.params.id;
    const painting = await Painting.findById(paintingId);
    res.render('painting', { title: 'Painting', painting } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 



/**
 * POST /search
 * Search 
*/
exports.searchPainting = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let painting = await Painting.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Painting - Search', painting } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}




/**
 * GET /explore-latest
 * Explore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 10;
    const painting = await Painting.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Painting - Explore Latest', painting } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}



/**
 * GET /submit-painting
 * Submit painting
*/
exports.submitPainting = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-painting', { title: 'Painting - Submit Painting', infoErrorsObj, infoSubmitObj  } );
}



/**
 * POST /submit-painting
 * Submit painting
*/
exports.submitPaintingOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newPainting = new Painting({
      category: req.body.category,
      image: newImageName,
    });
    
    await newPainting.save();

    req.flash('infoSubmit', 'Painting has been added.')
    res.redirect('/submit-painting');
  } catch (error) {
   console.log(error.message);
    req.flash('infoErrors', error);
    res.redirect('/submit-painting');
  }
}


















async function insertDymmyCategoryData(){
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
    console.log('err', + error)
  }
}

// insertDymmyCategoryData();










// async function insertDymmyPaintingData(){
//   try {
//     await Painting.insertMany([
//       { 
//         "name": "painting Name Goes Here",
//         "description": "painting Description Goes Here",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//       { 
//         "name": "painting Name Goes Here",
//         "description": `painting Description Goes Here`,
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmypaintingData();
