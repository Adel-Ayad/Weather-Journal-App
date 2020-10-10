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

let weatherData = [];


app.post('/recieveWeatherData', addWeatherData);

function addWeatherData(req, res) {
  //console.log(req.body);
  newEntry = {
    date: req.body.date,
    city: req.body.city,
    feeling: req.body.feeling,
    temp: req.body.temp
  }
  weatherData.unshift(newEntry)
  //console.log(weatheData)
}



app.get('/fetchWeatherData', sendWeatherData)

function sendWeatherData(req, res) {
  res.send(weatherData)
}