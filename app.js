
// Return server object
serverStart = function() {

	return require('express')();

};

// Any custom app initialization logic should go here
appStart = function(app) {

};

module.exports = function(frameworkDir, shared) {

	// Added web sdk dependencies 
	require('app-module-path').addPath(frameworkDir + '/node_modules'); 
	
	var keystoneInst = require('keystone');	
	keystoneInst.set('wysiwyg additional buttons', 'blockquote');

	return { 

		keystone: keystoneInst,
		server: serverStart,
		start: appStart	

	}

};