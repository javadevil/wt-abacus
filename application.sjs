'use strict';
/**
 * Abacus server application
 * @version 1.0.0
 * @author Wacharabuhm Tungketmuka
 */

const settings = require('./settings');

(function initApplication() {
	if (settings.mongodb) {	
		const MongoClient = require('mongodb').MongoClient;

		console.log('connect to:',settings.mongodb.url);
		MongoClient.connect(settings.mongodb.url,initExpress);
	} else {
		console.error('No database setting found');
	}
})();

function initExpress(err,db) {
	if (err) {
		console.error(err);
	}

	const application = require('express')();

	application.use(compression());
	application.use(session(db));

	application.use('/',require('./commons')());

	if (settings.http) {
		const http = require('http');
		const port = settings.http.port || 8000;
		console.log('HTTP listen:',port);
		http.createServer(application).listen(port);
	}
}

function compression() {
	return require('compression')();
}

function session(db) {
	const session = require('express-session');
	const MongoStore = require('connect-mongo')(session);
	return session({
		secret : settings.session.secret,
		resave : true,
		saveUninitialized : false,
		store : new MongoStore({
			db : db
		})
	});
}