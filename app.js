var createError = require('http-errors'); 
var express = require('express'); 
var path = require('path'); 
var cookieParser = require('cookie-parser'); 
var logger = require('morgan'); 
var mongoose = require('mongoose'); 
var indexRouter = require('./routes/index'); 
var usageData = require('./routes/usageData'); 

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://localhost:27017/usageData';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use('/', indexRouter); 
app.use('/usages', usageData); 



app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('pages/error');
});

toHours = function(minutes) {
  if( minutes/60 < 1){
    return Math.round(minutes) + " Minutes"
  }
  else if( minutes %60 == 0) {
    return minutes/60 + " Hours "
  }
  else{
    return Math.floor(minutes/60)+"Hr, "+Math.round(minutes%60) + "Min"
  }
}


module.exports = app;
