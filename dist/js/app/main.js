requirejs.config({
  'baseUrl': './js/app',
  'paths': {
    // load core libraries
    'jquery': '../lib/jquery-3.2.1',
    'ko': '../lib/knockout-3.4.2',
    'bootstrap': '../lib/bootstrap-3.3.7'
  },
  shim: {
    ko: {
      exports: 'ko'
    },
    bootstrap: {
      deps: 'jquery'
    }
  }
});

define(
  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ["ko"],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko){
    "use strict";
  }
);
