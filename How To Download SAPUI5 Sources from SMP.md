# How to Download SAPUI5 sources from Service Marketplace
To download SAPUI5 sources from SMP you need a user account that has access to the download
area.   
If you have such a user follow these instructions

* Go to [SMP Launchpad](https://launchpad.support.sap.com) and log in.
* Click on tile *Software-Downloads*
* In the search field at the top enter *sapui5*. Make sure that *Downloads* is selected in the Combobox beside the search field.
* Select *SAPUI5 CLIENT RT AS JAVA 7.50* (or whatever version you are interested in)
* Click on latest Patch-Level SCA file (e.g. UISAPUI5JAVA03P_11-80000708.SCA) --> Download will start
* Extract content of downloaded SCA file with a regular ZIP tool
* Move to folder *DEPLOYARCHIVES*
* Extract the content of file *ui-five.sda* with a regular ZIP tool
* Move into the extracted folder
* The *resources* folder contains all SAPUI5 sources
* Reference this folder in the bootstrap section of your SAPUI5 application

