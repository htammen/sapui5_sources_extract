# About
Script for extracting SAPUI5 JS-sources from the jar files delivered with Eclipse plugins.

# Preparation
Before you can use this script you first have to copy all UI5 plugin jars from the Eclipse 
plugins directory into another directory. Then you have to extract the content of this jar files
with a ZIP tool (you can use any tools that can extract zip files cause jar files are zip files)

* You need to have node.js installed

If you plan to make changes to the script you additionally have to install the following components 
(either globally or locally).

* You need to have tsc, the typescript compiler installed
* You need to have typings, the typescript definition manager


# Getting started
* Clone the repository from github
* cd into that directory
* run `npm install`

If you plan to make changes to the script do the following

* run `typings install`

# Running the script
To run the script 

* cd into the directory where the script is located
* run `node create_js_resources.js <sourceDir> <targetDir>`
    * `<sourceDir>` is the directory to which you extracted the jar files
    * `<targetDir>` is the directory to which the js files should be copied. The directory must not exist. 
    The script creates it.

After a few minutes the js files are available in the `<targetDir>/resources` directory. You can reference 
this directory in your sapui5 bootstrap code.
     
# Changing the script
To change the script you should *NOT* edit the js file but the ts file.

* run `tsc -w *.ts` to start the watch task of tsc. This task compiles a new js file from the ts file every 
time the latter file is changed.
* Make changes to the ts file
* run node with the js file

# Finding jar files in Eclipse
To find the jar files in eclipse cd into the `eclipse/plugins` directory and enter the following command

```
find . -regex "^.*com.sap.*1\.36.*\.jar"`
```
Replace `1.\36` with the release that is installed in your Eclipse