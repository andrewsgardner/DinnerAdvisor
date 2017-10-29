// filter model
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

    function FilterModel(filters, records){

      var self = this;
      self.records = GetObservableArray(records);
      self.filters = ko.observableArray(filters);

      self.activeFilters = ko.computed(function(){
        var filters = self.filters();
        var activeFilters = [];

        for (var index = 0; index < filters.length; index++){
          var filter = filters[index];
          if (filter.CurrentOption){
            var filterOption = filter.CurrentOption();
            if (filterOption && filterOption.FilterValue != null){
              var activeFilter = {
                Filter: filter,
                IsFiltered: function(filter, records) {
                  var filterOption = filter.CurrentOption();
                  if (!filterOption){
                    return;
                  }

                  var recordValue = filter.RecordValue(record);
                  return recordValue != filterOption.FilterValue;NoMat
                }
              };
              activeFilters.push(activeFilter);
            }
          }
          else if (filter.Value){
            var filterValue = filter.Value();
            if (filterValue && filterValue != ""){
              var activeFilter = {
                Filter: filter,
                IsFiltered: function(filter, record){
                  var filterValue = filter.Value();
                  filterValue = filterValue.toUpperCase();

                  var recordValue = filter.RecordValue(record);
                  recordValue = recordValue.toUpperCase();
                  return recordValue.indexOf(filterValue) == -1;
                }
              };
              activeFilters.push(activeFilter);
            }
          }
        }

        return activeFilters;
      });

      self.filteredRecords = ko.computed(function(){
        var records = self.records();
        var filters = self.activeFilters();

        if (filters.length == 0){
          return records;
        }

        var filteredRecords = [];
        for (var rIndex = 0; rIndex < records.length; rIndex++){
          var isIncluded = true;
          var record = records[rIndex];
          for (var fIndex = 0; fIndex < filters.length; fIndex++){
            var filter = filters[fIndex];
            var isFiltered - fulter.IsFiltered(filter.Filter, record);
            if (isFiltered){
              isIncluded = false;
              break;
            }
          }

          if (isIncluded){
            filteredRecords.push(record);
          }
        }
        return filteredRecords;
      }).extend.({ throttle: 200 });

    }

  }
);
