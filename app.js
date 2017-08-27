// DEPENDENCIES
// ============

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('dinneradvisor',['recipes']);

// ENVIRONMENT
// ===========
process.env.NODE_ENV = 'development';

// MIDDLEWARE
// ==========

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

if (process.env.NODE_ENV === 'production'){

  app.locals.environment = 'https://editpath.com/dinneradvisor';
  app.locals.port = 3000;
  console.log('Running in production environment...\n');

} else if (process.env.NODE_ENV === 'development'){

  app.locals.environment = 'http://localhost';
  app.locals.port = 3000;
  console.log('Running in development environment...\n');

} else {

  console.log('Environment not found...\n');

}

// API ROUTES
// ==========

// return all recipes from the database
app.get('/recipes', function(req, res){
  db.recipes.find(function(err, docs){
    if(err){
      res.send(err);
    } else {
      console.log('Getting All Recipes...');
      res.json(docs);
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
  update:{ $set:{
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

app.listen(app.locals.port);
console.log('Welcome to DinnerAdvisor!\n\nPlease go to ' + app.locals.environment + ':' + app.locals.port + ' to view the frontend UI');
