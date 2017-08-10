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
      self.recipeHealthRating = ko.observableArray();
      self.recipeSubmitterName = ko.observableArray();
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

        self.recipes.push({
          dishName: dishName,
          cookTime: cookTime,
          cuisineType: cuisineType,
          healthRating: healthRating,
          submitterName: submitterName
        });

        $.ajax({
          url: app.locals.environment + ":" + app.locals.port + "/recipes",
          data: JSON.stringify({
            "dishName": dishName,
            "cookTime": cookTime,
            "cuisineType": cuisineType,
            "healthRating": healthRating,
            "submitterName": submitterName
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

        self.recipes.remove(function(item){
          return item._id == id
        });

        self.recipes.push({
          dishName: dishName,
          cookTime: cookTime,
          cuisineType: cuisineType,
          healthRating: healthRating,
          submitterName: submitterName
        });

        $.ajax({
          url: app.locals.environment + ":" + app.locals.port + "/recipes" + id,
          data: JSON.stringify({
            "dishName": dishName,
            "cookTime": cookTime,
            "cuisineType": cuisineType,
            "healthRating": healthRating,
            "submitterName": submitterName
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

    }

    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);

  }
);
