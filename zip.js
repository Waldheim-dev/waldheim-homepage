let zipdir = require('zip-dir');
let pjson = require('./package.json');

  zipdir('dist/waldheim.dev.homepage', {saveTo: 'dist/waldheim.dev.homepage_'+pjson.version+'.zip'}, function (err) {
    if (err !== null) {
      console.log("Error: "+err.path)
      process.exit(1)
      return;
    } else {
      console.log("Files zipped")
      process.exit(0)
      return;
    }
  });

