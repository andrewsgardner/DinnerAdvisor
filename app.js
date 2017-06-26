// DEPENDENCIES
// ============

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

// update recipes in the database
app.put('/recipes/:id', function(req, res){
  db.recipes.findAndModify({query:{_id: mongojs.ObjectId(req.params.id)},
  update:{ $set{
    dishName: req.body.dishName,
    cookTime: req.body.cookTime,
    cuisineType: req.body.cuisineType,
    healthRating: req.body.healthRating,
    submitterName: req.body.submitterName,
    recipeContent: req.body.recipeContent
  }},
  new: true
    }, function(err, doc){
    if(err){
      res.send(err);
    } else {
      console.log('Updating Recipe...');
      res.json(doc);
    }
  });
});

// remove recipes in the database
app.delete('/recipes/:id', function(req, res){
  db.recipes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, doc){
    if(err){
      res.send(err);
    } else {
      console.log('Removing Recipe...');
      res.json(doc);
    }
  });
});

// NODE SERVER
// ===========

app.listen(3000);
console.log('Welcome to DinnerAdvisor!\n\nPlease go to http://localhost:3000 to view the frontend UI');
