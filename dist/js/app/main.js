requirejs.config({
  'baseUrl': './js/app',
  'paths': {
    // load core libraries
    'jquery': '../lib/jquery-3.2.1',
    'ko': '../lib/knockout-3.4.2'
  },
  shim: {
    ko: {
      exports: 'ko'
    }
  }
});

requirejs(['main']);

