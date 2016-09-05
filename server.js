var express = require('express')
var hbs = require('express-handlebars')

var app = express()
var weather = require('./weather')
var path = require('path')

app.engine ('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.get ('/', function (req, res) {
  res.render('index', weather)
})
app.get ('/weather/:id', function (req, res) {
  res.render('weather', weather.weather[req.params.id])
})

app.listen (3000, function(){
   console.log ('listening on port 3000')
})
