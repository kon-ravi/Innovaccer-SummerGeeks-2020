//Importing required packages
const express = require('express');

//Creating router object
const router = express.Router();

const visitorController = require('../controllers/visitor');

//Routes
router.get('/visitor', visitorController.getVisitorPage);

router.post('/visitor', visitorController.addVisitor);

router.get('/visitor/checkoutVisitor', visitorController.getCheckoutPage);

router.post('/visitor/checkout', visitorController.checkoutVisitor);

module.exports = router;
