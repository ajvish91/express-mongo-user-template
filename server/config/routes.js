var auth = require('./auth'),
	user = require('../controllers/users');

module.exports = function(app) {
	app.get('/', function(req, res) {
		req.pipe(res);
		res.end("ended");
	})
	app.post('/signup', user.addUser);
	app.get('/api/user/:id', user.viewUser);
	app.put('/api/user/:id', user.updateUser);
	app.delete('/api/user/:id', user.removeUser);
}