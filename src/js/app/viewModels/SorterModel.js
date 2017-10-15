// sorter model
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

    function SorterModel(sortOptions, records) {

      var self = this;
      self.records = GetObservableArray(records);
      self.sortOptions = ko.observableArray(sortOptions);
      self.sortDirections = ko.observableArray([
        {
          Name: "Asc",
          Value: "Asc",
          Sort: false
        },
        {
          Name: "Desc",
          Value: "Desc",
          Sort: true
        }
      ]);
      self.currentSortOption = ko.observable(self.sortOptions()[0]);
      self.currentSortDirection = ko.observable(self.sortDirections()[0]);
      self.orderedRecords = ko.computed(function() {
        var records = self.records();
        var sortOption = self.currentSortOption();
        var sortDirection = self.currentSortDirection();

        if (sortOption == null || sortDirection == null) {
          return records;
        }

        var sortedRecords = records.slice(0, records.length);
        SortArray(sortedRecords, sortDirection.Sort, sortOption.Sort);
        return sortedRecords;

      }
    ).extend({ throttle: 5 });

    }

  }
);
