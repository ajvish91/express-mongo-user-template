var passport = require('passport');

exports.authenticate = function(req, res, next) {
	if(req.body.username) {
		req.body.username = (req.body.username).toLowerCase();
	}
	var auth = passport.authenticate('local', function(err, user) {
		if (err) return next(err);
		else if (!user) return res.json({
			success: false
		});
		req.logIn(user, function(err) {
			if (err) return next(err);
			res.json({
				success: true,
				user: user
			});
		})
	});
	auth(req, res, next);
}

exports.apiLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.sendStatus(403);
		res.end();
	} else {
		next();
	}
}

exports.requiresRole = function(role) {
	return function(req, res, next) {
		if (!req.isAuthenticated()) {
			res.sendStatus(403);
			res.end();
		} else if (req.user.roles.indexOf(role) === -1) {
			res.sendStatus(403);
			res.end();
		} else {
			next();
		}
	}
}