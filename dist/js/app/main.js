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
  }
);
