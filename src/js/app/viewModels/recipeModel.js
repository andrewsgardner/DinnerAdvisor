// recipe model
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ["knockout", "RecipePageModel"],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $){
    "use strict";

    function RecipeModel(data){

      if (!data){
        data = {};
      }

      var self = this;
      self.dishName = data.dishName;
      self.cookTime = data.cookTime;
      self.cuisineType = data.cuisineType;
      self.healthRating = data.healthRating;
      self.submitterName = data.submitterName;
      self.recipeContent = data.recipeContent;

    }

  }
);
