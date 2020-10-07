/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;

//Spin up the server

const server = app.listen(port, callv);

function callv() {
    console.log(`server is running on port ${port}`);
};

app.post('/currentWeather', updateWeather);

function updateWeather(req, res) {


    console.log(req.body);
    /*  newEntry = {
       animal: req.body.animal,
       facts: req.body.fact,
       fav: req.body.fav
     } */


    /* 
      animalData.push(newEntry)
      console.log(animalData) */
}
