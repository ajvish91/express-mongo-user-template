var path = require('path')
var rootPath = path.normalize(__dirname + '/../../')
module.exports = {
	development: {
		db: 'mongodb://localhost/testdatabase',
		rootPath: rootPath,
		port: process.env.PORT || 3000
	},
	production: {
		db: 'mongodb://<username>:<password>@<IP Address>:<port>/<databasename>',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
}