requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    // load core libraries
    "jquery": "jquery-3.2.1",
    "knockout": "knockout-3.4.2",
    "bootstrap": "bootstrap-3.3.7",
    "app": "../app",
    "RecipeModel": "../app/viewModels/RecipeModel",
    "RecipePageModel": "../app/viewModels/RecipePageModel",
    "PagerModel": "../app/viewModels/PagerModel",
    "SorterModel": "../app/viewModels/SorterModel"
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
