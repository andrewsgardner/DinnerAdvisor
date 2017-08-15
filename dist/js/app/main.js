requirejs.config({
  "baseUrl": "./js/app",
  "paths": {
    // load core libraries
    "jquery": "../lib/jquery-3.2.1",
    "knockout": "../lib/knockout-3.4.2",
    "bootstrap": "../lib/bootstrap-3.3.7"
  },
  shim: {
    "ko": {
      "exports": [ "ko" ]
    },
    "jquery": {
      "exports": [ "$" ]
    },
    "bootstrap": {
      "deps": [ "jquery" ]
    }
  }
});

// main app module
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ["knockout", "jquery", "bootstrap"],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $){
    "use strict";

    // get recipes from the database
    function getRecipes(){
      $.get(app.locals.environment + ':' + app.locals.port + '/recipes', function(data){
        viewModel.recipes(data);
      });
    }

    // main viewModel
    function ViewModel(){
      var self = this;

      self.recipes = ko.observableArray();
      self.recipeInputDishName = ko.observableArray();
      self.recipeInputCookTime = ko.observableArray();
      self.recipeInputCuisineType = ko.observableArray();
      self.recipeInputHealthRating = ko.observableArray();
      self.recipeInputSubmitterName = ko.observableArray();
      self.recipeInputContent = ko.observable();
      self.selectedRecipes = ko.observableArray();
      self.isUpdate = ko.observableArray(false);
      self.updateId = ko.observableArray();
      self.canEdit = ko.computed(function(){
        return self.selectedRecipes().length > 0;
      });

      // add new recipe
      self.addRecipe = function(){
        var dishName = $('#dishName').val();
        var cookTime = $('#cookTime').val();
        var cuisineType = $('#cuisineType').val();
        var healthRating = $('#healthRating').val();
        var submitterName = $('#submitterName').val();
        var recipeContent = $('#recipeContent').val();

        self.recipes.push({
          dishName: dishName,
          cookTime: cookTime,
          cuisineType: cuisineType,
          healthRating: healthRating,
          submitterName: submitterName,
          recipeContent: recipeContent
        });

        $.ajax({
          url: app.locals.environment + ":" + app.locals.port + "/recipes",
          data: JSON.stringify({
            "dishName": dishName,
            "cookTime": cookTime,
            "cuisineType": cuisineType,
            "healthRating": healthRating,
            "submitterName": submitterName,
            "recipeContent": recipeContent
          }),
          type: "POST",
          contentType: "application/json",
          success: function(data){
            console.log('Recipe added...');
          },
          error: function(xhr, status, err){
            console.log(err);
          }
        });
      }

      // update recipe
      self.updateRecipe = function(){
        var id = self.updateId;
        var dishName = $('#dishName').val();
        var cookTime = $('#cookTime').val();
        var cuisineType = $('#cuisineType').val();
        var healthRating = $('#healthRating').val();
        var submitterName = $('#submitterName').val();
        var recipeContent = $('#recipeContent').val();

        self.recipes.remove(function(item){
          return item._id == id
        });

        self.recipes.push({
          dishName: dishName,
          cookTime: cookTime,
          cuisineType: cuisineType,
          healthRating: healthRating,
          submitterName: submitterName,
          recipeContent: recipeContent
        });

        $.ajax({
          url: app.locals.environment + ":" + app.locals.port + "/recipes/" + id,
          data: JSON.stringify({
            "dishName": dishName,
            "cookTime": cookTime,
            "cuisineType": cuisineType,
            "healthRating": healthRating,
            "submitterName": submitterName,
            "recipeContent": recipeContent
          }),
          type: "PUT",
          contentType: "application/json",
          success: function(data){
            console.log('Recipe updated...');
          },
          error: function(xhr, status, err){
            console.log(err);
          }
        });
      }

      // edit first selected recipe
      self.editFirstSelected = function(){

        self.updateId = self.selectedRecipes()[0]._id;

        var dishName = self.selectedRecipes()[0].dishName;
        var cookTime = self.selectedRecipes()[0].cookTime;
        var cuisineType = self.selectedRecipes()[0].cuisineType;
        var healthRating = self.selectedRecipes()[0].healthRating;
        var submitterName = self.selectedRecipes()[0].submitterName;
        var recipeContent = self.selectedRecipes()[0].recipeContent;

        self.isUpdate(true);
        self.recipeInputDishName(dishName);
        self.recipeInputCookTime(cookTime);
        self.recipeInputCuisineType(cuisineType);
        self.recipeInputHealthRating(healthRating);
        self.recipeInputSubmitterName(submitterName);
        self.recipeInputContent(recipeContent);
      }

    }

    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);

  }
);
