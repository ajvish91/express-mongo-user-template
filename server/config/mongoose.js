var mongoose = require('mongoose'),
	users = require('../models/users');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'))
	db.once('open', function() {
		console.log('Database has opened up...')
	})/*
	users.createDefaultUsers();*/
}