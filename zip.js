let zipdir = require('zip-dir');
let pjson = require('./package.json');

  zipdir(`dist/${pjson.name}/browser`, {saveTo: `dist/apps/${pjson.name}_${pjson.version}.zip`}, function (err) {
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

