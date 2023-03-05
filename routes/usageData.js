const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usages = require('../models/usage');

const usageData = express.Router();

usageData.route('/')
.get((req,res,next) => {
    res.end("just checking --> nothing to do")
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});


usageData.route('/create')
.get((req,res,next) => {
    res.render('newUsage.ejs', { title: 'Usage Data' });   
})

.post((req, res, next) => {
    usages.create(req.body)
        .then((usagecreated) => {
            usages.find() 
                .then((usagesfound) => { 
                    res.render('currententry',{'usagelist' : usagesfound, title:'All usages'} );
                }, (err) => next(err))
                .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err)); 
})

usageData.route('/viewentry')
.get((req,res,next) => {
    res.render('viewentry.ejs', { title: 'View Entry' });   
})

.post((req, res, next) => {
            console.log(req.body);
            usages.find({
                name: req.body.name, createdAt: { $gte: new Date(req.body.Date[0]), $lte: new Date(req.body.Date[1]+'T23:59:59.000')}
            }) 
                .then((usagesfound) => { 
                    res.render('userreport',{'usagelist' : usagesfound, title:'Usage data of: ' + req.body.name} );
                }, (err) => next(err))
                .catch((err) => next(err));
        })

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /usages/create');
})


usageData.route('/allentries')
.get((req,res, next) => {
    usages.find()
    .then((usagesfound) => {
        res.render('currententry', {'usagelist' : usagesfound, title:'all usages'});
    }, (err) => next(err))
    .catch((err) => next(err));
}) 

usageData.get('/delete/:id', function(req,res){
    usages.findByIdAndRemove(req.params.id, function(err, project) {
        if(err) {
            console.log('Record Not Deleted');
            res.redirect('/usages/allentries');
        }
        else{
            console.log('Record Deleted');
            res.redirect('/usages/allentries');
        }
    })
});

usageData.route('/edit/:id')
.get(function(req, res) {
    console.log(req.params.id);
    usages.findById(req.params.id, function(err, usage) {
        if (err) {
            console.log(err);
        } else {
            console.log(usage);

            res.render('editentry.ejs', { title: usage.name, education: usage.educationUsage, shopping: usage.shoppingUsage, browsing: usage.browsingUsage, social: usage.socialMediaUsage  });
        }
    });
})

.post(function(req,res){
    console.log(req.body);
    usages.updateOne({_id: req.params.id}, req.body, function(err){
        if (err){
            console.log("Failure");
            res.redirect('/usages/edit/' + req.params.id);
        }
        else{
            console.log("Success");
            res.redirect("/usages/allentries");
        }
    })
})


module.exports = usageData;