/// <reference path="typings/globals/node/index.d.ts" />

/** This script creates a sapui5/resources folder with all the javascript resources that are necessary to run SAPUI5
 * application on a server.
 * - At commandline you have to define the folder in which you copied the unpacked / unzipped files SAPUI5 jar files
 * - The script runs over all subfolders and copies the content of META-INF/resources into the defined target folder
 * In the bootstraping of your project you then reference to the sap-ui-core.js file contained in the target/resource folder
*/

import * as fs from "fs";
import * as sh from "shelljs";

let sourceDir:string;
let targetDir:string;

//Normalize the arguments, the first two arguments are node and the script name
let args:Array<string> = process.argv.splice(2);

args.forEach((val, index, array) => {
	if(index === 0) sourceDir = val;
	if(index === 1) targetDir = val;
});

console.log("sourceDir: " + sourceDir);
console.log("targetDir: " + targetDir);

if(!sourceDir || !targetDir) {
	console.log("please define sourceDir and targetDir at command line");
	process.exit(1);
}

// check the input parameters
try {
	fs.accessSync(sourceDir, fs.R_OK);
} catch (e) {
	console.log("sourceDir does not exist");
	console.error(e);
	process.exit(2);
}
try {
	fs.accessSync(targetDir, fs.W_OK);
	console.log("targetDir already exists. Please define another one or delete the directory first");
	process.exit(3);
} catch (e) {
	if(e.code === "ENOENT") { // no such file or directory
		sh.mkdir('-p', targetDir + "/resources");
	} else {
		throw(e);
	}
}

// extract the jar files
//sh
//	.find(sourceDir)
//	.filter( function(fileName) {
//		return fileName.match(/.*\.jar/)
//	})
//	.forEach(function(jarFile:string) {
//		let raw = fs.createReadStream(jarFile);
//		let folderName = jarFile.substring(0, jarFile.indexOf("."));
//		let out = fs.createWriteStream(folderName);
//		zlib.unzipSync()
//	});


sh
	.find(sourceDir)
	.filter(
		function(file:string) {
			// filter all META-INF/resources directories
			return file.match(/\/META-INF\/resources$/)
		}
	)
	.forEach(
		function(dir) {
			if(dir) {
				console.log(`extracting ${dir}`);
				// copy the filtered directory into the target directory
				sh.cp('-R', dir, targetDir);
			}
		}
	);

console.log("FINISHED");