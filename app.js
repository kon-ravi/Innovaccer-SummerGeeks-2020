//Third party packages requirements
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Import Host and Visitor model
const Host = require('./models/host');
const Visitor = require('./models/visitor');

//Import Routes
const homeRoute = require('./routes/home');
const visitorRoute = require('./routes/visitor');
const hostRoute = require('./routes/host');

//MONGODB ATLAS CONNECTION STRING
// const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-vkggs.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;
const MONGODB_URI = `mongodb://localhost/innovaccerassignment`;

//Initiliasing new express app
const app = express();

//Making "public" folder static
app.use(express.static('./public'));

//Configuring view engine
app.set('view engine', 'ejs');

//Configuring bodyParser
app.use(bodyParser.json());

//Routes
app.use(homeRoute);
app.use(visitorRoute);
app.use(hostRoute);

//Starting server
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 8008, () => {
      console.log('Server started on port ' + (process.env.PORT || 8008));
    });
    //On app crashing
    process.on('uncaughtException', err => {
      console.log(err);
    });

    //On killing the app
    process.on('SIGTERM', err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
