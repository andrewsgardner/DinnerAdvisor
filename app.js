// LOAD REQUIRED NODE MODULES
// ==========================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('mongojs');
var db = mongojs('dinneradvisor',['recipes']);

// MIDDLEWARE
// ==========

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

// API ROUTES
// ==========

// return all recipes from the database
app.get('/recipes', function(req, res){
  db.recipes.find(function(err, docs){
    if(err){
      res.send(err);
    } else {
      console.log('Getting All Recipes...');
      res.json(doc);
    }
  });
});

// enter new recipes into the database
app.post('/recipes', function(req, res){
  db.recipes.insert(req.body, function(err, doc){
    if(err){
      res.send(err);
    } else {
      console.log('Adding Recipe...');
      res.json(doc);
    }
  });
});
