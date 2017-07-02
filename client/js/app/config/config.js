requirejs.config({
  'baseUrl': './js/app',
  'paths': {
    // core libraries
    'jquery': '../lib/jquery-3.2.1'
  }
});

requirejs(['main']);
