let zipdir = require('zip-dir');
let pjson = require('./package.json');

  zipdir('dist/apps/waldheim-dev', {saveTo: 'dist/apps/dev.waldheim.www_'+pjson.version+'.zip'}, function (err) {
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

