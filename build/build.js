// node build/r.js -o build/build.js
({
  appDir: "../src",
  baseUrl: "js/lib",
  dir: "../dist",
  mainConfigFile: "../src/js/config.js",
  fileExclusionRegExp: /.*(less)$/,
  optimizeCss: "standard",
  removeCombined: true,
  modules: [
    {
      name: "app/app"
    }
  ]
})
