// recipe model
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

    function recipeModel(data){

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
