// Importing necessary modules for the Express.js application
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Creating an instance of the Express.js application
const app = express();

// Setting the port for the application, defaulting to 3000 if not specified in the environment
const port = process.env.PORT || 3000;

// Loading environment variables from a .env file
require('dotenv').config();

// Middleware setup

// Parsing URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Using EJS layouts for rendering views
app.use(expressLayouts);

// Parsing cookies with the provided secret
app.use(cookieParser('PaintingSecure'));

// Setting up sessions with a secret, allowing uninitialized and resaving sessions
app.use(session({
  secret: 'PaintingSecretSession',
  saveUninitialized: true,
  resave: true
}));

// Adding flash message functionality
app.use(flash());

// Handling file uploads
app.use(fileUpload());

// Setting the layout and view engine for the application
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Importing and using the painting routes from the specified file
const routes = require('./server/routes/paintingRoutes.js');
app.use('/', routes);

// Starting the server and listening on the specified port
app.listen(port, () => console.log(`Listening to port ${port}`));
