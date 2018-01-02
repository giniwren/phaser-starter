/**
 * Build script for combining javascript files into a single file and minifying it.
 *
 * There are several command line arguments that can be passed to the script:
 *
 * js-path: root of where to find the javascript files to be built
 * build-path: directory where the end file should be saved
 * skip-uglify: if included, just combine the javascript files without uglifying the final result
 * config: path to where an optional config file with an ordered list of javascript files to build.
 *
 * If you specify it all, it would look like
 *   npm run build -- --js-path=src/static/js --build-path=src/static/builds --config=config.json --skip-uglify
 *
 * If you opt to use a config file, it should include a `jsFiles` array with names,
 * in the end looking something like:
 * {
 *   "jsFiles": ["src/static/js/someFile.js", "src/static/js/someOtherFile.js"]
 * }
 * where "jsFiles" is the full, ordered list of javascript files needed to build
 * the single javascript file.
 */

'use strict';

// node module for accessing the file system
const fs = require('fs');
// node module for building system-appropriate paths
const path = require('path');
// node module for uglifying javascript
const uglify = require('uglify-js');
// node module for taking command line arguments
const argv = require('yargs').argv;

// config object containing list of javascript files that should be
// included in build, listed under the top-level `jsFiles` key
var config = {
  jsFiles: []
};

// name of the final file with combined+minified javascript
const buildFileName = 'build.min.js';

// put all the JS together and minify it
build(argv);

/**
 * Main function for combining and minifying project javascript files
 */
function build(args) {
  // where the uncombined javascript files live
  var relAssetsPath = args['js-path'] || config.jsPath || '.';
  console.log('relAssetsPath', relAssetsPath);
  var assetsPath = path.join(relAssetsPath);

  // where the build file will be output (by default, same directory as original javascript files)
  var relBuildPath = args['build-path'] || relAssetsPath;
  var buildPath = path.join(relBuildPath);

  // whether js uglification should be skipped (false if argument is omitted or not specified as false)
  var skipUglification = args['skip-uglify'] !== undefined || args['skip-uglify'] !== 'false';

    // where config json should be
  var configPath = args.config;
  if (configPath) {
    try {
      config = require(configPath);
    } catch(err) {
      console.log('Unable to load config json from given path.');
      throw err;
    }
  } else {
    // get names of js files in current directory and add to config object
    config.jsFiles = getJSFilenames(assetsPath);
  }

  // ordered list of files to combine for build
  var jsFiles = getJSPaths(config.jsFiles, assetsPath);

  // uglify JS files
  var jsData = combineFiles(jsFiles);

  // create final build file
  writeJSFile(jsData, buildPath, skipUglification);
}

/**
 * Get list of javascript files from a directory
 */
function getJSFilenames(directoryPath) {
  var fileList = [];
  var files = fs.readdirSync(directoryPath);
    for (var fileIdx in files) {
      var file = files[fileIdx];
      if (file.indexOf('.js') === file.length - 3) {
        fileList.push(file);
      }
    }
  return fileList;
}

/**
 * Use list of relative javascript file paths to generate
 * full paths.
 */
function getJSPaths(files, assetsPath) {
  var filePaths = [];
  for (var fileIdx in files) {
    filePaths.push(path.join(assetsPath, files[fileIdx]));
  }
  return filePaths;
}

/**
 * Reads list of files and combines the data into a string.
 */
function combineFiles(jsFiles) {
  console.log('Combining data from files:');
  var combinedJS = '';
  for (var fileIdx in jsFiles) {
    console.log('-', jsFiles[fileIdx]);
    var data = fs.readFileSync(jsFiles[fileIdx], 'utf-8');
    combinedJS += data;
  }
  return combinedJS;
}

/**
 * Writes the data from javascript files into a single file,
 * also minifying it by default.
 */
function writeJSFile(data, buildPath, skipUglification) {
  console.log('Writing files into one file...');

  // create new file for minified JS
  var output = fs.createWriteStream(path.join(buildPath, buildFileName));

  if (skipUglification) {
    output.write(data);
  } else {
    console.log('Minifying...');
    // minify the final file
    var result = uglify.minify(data);
    output.write(result.code);
  }
  output.end();

  console.log('File successfully written to', buildFileName);
}
