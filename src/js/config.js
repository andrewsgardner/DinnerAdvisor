requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    // load core libraries
    "jquery": "jquery-3.2.1",
    "knockout": "knockout-3.4.2",
    "bootstrap": "bootstrap-3.3.7",
    "app": "../app",
    "recipeModel": "../app/viewModels/recipeModel"
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

requirejs(["app/app"]);
