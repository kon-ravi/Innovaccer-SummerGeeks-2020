//Importing required packages
const express = require('express');

//Creating router object
const router = express.Router();

const homeController = require('../controllers/home');

//Routes
router.get('/', homeController.getHomePage);

module.exports = router;
