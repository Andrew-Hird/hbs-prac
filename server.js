var express = require('express')
var hbs = require('express-handlebars')
var fs = require('fs')
var app = express()
var path = require('path')

app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

function getWeather (callback) {
  fs.readFile('./weather.json', function (err, json) {
    var weather = JSON.parse(json)
    callback(null, weather)
  })
}

app.get('/', function (req, res) {
  getWeather(function (err, weather) {
    res.render('index', weather)
  })
})

app.get('/weather/:id', function (req, res) {
  getWeather(function (err, weather) {
    res.render('weather', weather.weather[req.params.id])
  })
})

app.listen(3000, function () {
  console.log('listening on port 3000')
})
