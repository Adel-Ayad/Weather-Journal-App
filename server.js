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



// be ready to recieve data from app.js(client side) 
app.post('/recieveWeatherData', addWeatherData);

function addWeatherData(req, res) {
  //Process the recieved data
  newEntry = {
    date: req.body.date,
    city: req.body.city,
    country: req.body.country,
    feeling: req.body.feeling,
    temp: req.body.temp
  }
  // add processed data to  weather data array 
  projectData = newEntry

}


//be ready to send processed data when the app.js(client side) fetch these data from the server
app.get('/fetchWeatherData', sendWeatherData)

function sendWeatherData(req, res) {
  res.send(projectData) //send the array which contain processed data 
}