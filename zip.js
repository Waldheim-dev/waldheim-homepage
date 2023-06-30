import zipdir  from 'zip-dir';
// load the package.json file without using require()

import fs from 'fs';
const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));


  zipdir(`dist`, {saveTo: `dist/${pjson.name}_${pjson.version}.zip`}, function (err) {
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

