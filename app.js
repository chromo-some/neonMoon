
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
let port = process

const apiKey = '90a9239076898a3eb4b312fe42227774';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null, arg: null, sun: null});
})

app.post('/', function (req, res) {
  let city = req.body.area;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
   request(url, function (err, response, body) {
    if(err){
      console.log(`you just typed that does not exist... or check the internet connection`);
      res.render('index', {weather: null, arg: null, error: 'Error, please try again... you enter something that does not exist!'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, arg: null, error: 'Error, please try again... you enter something that does not exist!'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees celsius in ${weather.name}!`;
        let arg = `pressure is ${weather.main.pressure} hPa, humidity is ${weather.main.humidity}%`;
        console.log(`this is full report`);
        console.log(weather);
        res.render('index', {weather: weatherText, error: null, arg: arg});
      }
    }
  });
})

let port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('app listening on port ${port}!')
})
