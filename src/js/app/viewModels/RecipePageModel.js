// recipe page model
define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ["knockout", "RecipeModel"],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, $){
    "use strict";

    function RecipePageModel(data){

      if (!data){
        data = {};
      }

      var self = this;
      self.recipes = ExtractModels(self, data.recipes, RecipeModel);

      var filters = [
        {
          Type: "text",
          Name: "Name",
          Value: ko.observable(""),
          RecordValue: function(record) { return record.dishName; }
        },
        {
          Type: "select",
          Name: "Status",
          Options: [
            GetOption("All", "All", null),
            GetOption("None", "None", "None"),
            GetOption("New", "New", "New"),
            GetOption("Recently Modified", "Recently Modified", "Recently Modified")
          ],
          CurrentOption: ko.observable(),
          RecordValue: function(record) { return record.status; }
        }
      ];

      var sortOptions = [
        {
          Name: "ID",
          Value: "ID",
          Sort: function(left, right) { return left.id < right.id; }
        },
        {
          Name: "Name",
          Value: "Name",
          Sort: function(left, right) { return CompareCaseInsensitive(left.dishName, right.dishName); }
        },
        {
          Name: "Status",
          Value: "Status",
          Sort: function(left, right) { return CompareCaseInsensitive(left.status, right.status); }
        }
      ];

      self.filter = new FilterModel(filters, self.recipes);
      self.sorter = new SorterModel(sortOptions, self.filter.filteredRecords);
      self.pager = new PagerModel(self.sorter.orderedRecords);

    }

  }
);
