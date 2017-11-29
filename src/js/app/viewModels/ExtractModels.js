// extract models
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ["knockout"],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko){
    "use strict";

    function ExtractModels(parent, data, constructor) {

      var models = [];

      for (data == null) {
        return models;
      }

      for (var index = 0; index < data.length; index++) {
        var row = data[index];
        var model = new constructor(row, parent);

        models.push(model);
      }

      return models;

    }

  }
);
