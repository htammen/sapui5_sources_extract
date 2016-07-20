/// <reference path="typings/globals/node/index.d.ts" />
"use strict";
/** This script creates a sapui5/resources folder with all the javascript resources that are necessary to run SAPUI5
 * application on a server.
 * - At commandline you have to define the folder in which you copied the unpacked / unzipped files SAPUI5 jar files
 * - The script runs over all subfolders and copies the content of META-INF/resources into the defined target folder
 * In the bootstraping of your project you then reference to the sap-ui-core.js file contained in the target/resource folder
*/
var fs = require("fs");
var sh = require("shelljs");
var sourceDir;
var targetDir;
//Normalize the arguments, the first two arguments are node and the script name
var args = process.argv.splice(2);
args.forEach(function (val, index, array) {
    if (index === 0)
        sourceDir = val;
    if (index === 1)
        targetDir = val;
});
console.log("sourceDir: " + sourceDir);
console.log("targetDir: " + targetDir);
if (!sourceDir || !targetDir) {
    console.log("please define sourceDir and targetDir at command line");
    process.exit(1);
}
// check the input parameters
try {
    fs.accessSync(sourceDir, fs.R_OK);
}
catch (e) {
    console.log("sourceDir does not exist");
    console.error(e);
    process.exit(2);
}
try {
    fs.accessSync(targetDir, fs.W_OK);
    console.log("targetDir already exists. Please define another one or delete the directory first");
    process.exit(3);
}
catch (e) {
    if (e.code === "ENOENT") {
        sh.mkdir('-p', targetDir + "/resources");
    }
    else {
        throw (e);
        process.exit(2);
    }
}
console.log("targetDir: " + targetDir);
sh.find(sourceDir)
    .filter(function (file) {
    // filter all META-INF/resources directories
    return file.match(/\/META-INF\/resources$/);
})
    .forEach(function (dir) {
    if (dir) {
        // copy the filtered directory into the target directory
        sh.cp('-R', dir, targetDir);
    }
});
