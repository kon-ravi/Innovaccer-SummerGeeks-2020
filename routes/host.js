//Importing required packages
const express = require('express');

//Creating router object
const router = express.Router();

const hostController = require('../controllers/host');

//Routes
router.get('/host', hostController.getHostPage);

router.post('/host', hostController.addHost);

module.exports = router;
