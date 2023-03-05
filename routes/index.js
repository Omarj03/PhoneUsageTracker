var express = require('express');
const { route } = require('./usageData');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Phone Usage' });
});

router.route('/about')
.get((req,res) => {
  res.render('about', { title: 'About Us' });   
})

router.route('/help')
.get((req,res) => {
  res.render('help', {title: 'Help'});

})

router.route('/viewEntries')
    .get((req,res) => {
  res.render('viewEntries',{title: 'View Entries'});
})

module.exports = router;
