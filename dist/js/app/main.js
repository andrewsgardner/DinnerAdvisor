requirejs.config({
  'baseUrl': './js/app',
  'paths': {
    // load core libraries
    'jquery': '../lib/jquery-3.2.1'
  }
});

requirejs(['main']);

