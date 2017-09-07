// main app module
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ["knockout", "jquery", "bootstrap", "recipeModel"],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $){
    "use strict";

    // get recipes from the database
    $.getJSON("/recipes", function(data){
      viewModel.recipes(data);
    })

    // main viewModel
    function ViewModel(){
      var self = this;

      self.recipes = ko.observableArray();
      self.recipeInputDishName = ko.observable();
      self.recipeInputCookTime = ko.observable();
      self.recipeInputCuisineType = ko.observable();
      self.recipeInputHealthRating = ko.observable();
      self.recipeInputSubmitterName = ko.observable();
      self.recipeInputContent = ko.observable();
      self.selectedRecipes = ko.observableArray();
      self.isUpdate = ko.observable(false);
      self.updateId = ko.observable();
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
          url: "/recipes",
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
          url: "/recipes/" + id,
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

      // delete selected recipes
      self.deleteSelectedRecipes = function(){

        $.each(self.selectedRecipes(), function(index, value){
          var id = self.selectedRecipes()[index]._id;

          $.ajax({
            url: "/recipes/" + id,
            type: "DELETE",
            async: true,
            timeout: 10000,
            success: function(data){
              console.log('Recipe removed...');
            },
            error: function(xhr, status, err){
              console.log(err);
            }
          });
        });

        self.recipes.removeAll(self.selectedRecipes());
        self.selectedRecipes.removeAll();
      }

      // health rating scale
      self.healthRatingScale = ko.observableArray([
        "1",
        "2",
        "3",
        "4",
        "5"
      ]);

    }

    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);

  }
);
