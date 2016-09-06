var express = require('express')
var hbs = require('express-handlebars')
var fs = require('fs')
var app = express()
var path = require('path')

app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  fs.readFile('./weather.json', function (err, json) {
    weather = JSON.parse(json)
    res.render('index', weather)
  })
})

app.get('/weather/:id', function (req, res) {
  fs.readFile('./weather.json', function (err, json) {
    weather = JSON.parse(json)
    res.render('weather', weather.weather[req.params.id])
  })
})

app.listen(3000, function () {
  console.log('listening on port 3000')
})
