var mongoose = require('mongoose'),
User = mongoose.model('User'),
utilities = require('../config/utilities'),
messages = require('../config/messages');

exports.addUser = function(req, res) {
	console.log("Creating user")
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = utilities.createSalt();
	userData.hashed_pwd = utilities.hashPwd(userData.salt, userData.password);
	User.create(userData, function(err, user) {
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error('Duplicate Username');
			}
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		/*req.logIn(user, function(err) {
			if (err) return next(err);*/
			res.end({message: added, id: user.id});
		//})
	})
}

exports.viewUser = function(req, res) {
	User.findOne({
		"_id": req.params.id
	}, function(err, user) {
		if(err) {
			res.status(400)
			return res.json({
				reason: err.toString()
			})
		}
		if(user.length == 0) {
			return res.json({message: messages.user_not_found});
		}
		res.json(user)
	})
}

exports.updateUser = function(req, res) {
	if(typeof req.params.id === "undefined") {
		return res.json({ message: "ID" + messages.missing });
	}
	if(typeof req.body.firstname === "undefined") {
		return res.json({ message: "firstname" + messages.missing });
	}
	if(typeof req.body.lastname === "undefined") {
		return res.json({ message: "lastname" + messages.missing });
	}
	newData = {
		firstname: req.body.firstname,
		lastname: req.body.lastname
	}
	User.findOne({
		"_id": req.params.id
	}, function(err, user) {
		if(err) {
			res.status(400)
			return res.json({
				reason: err.toString()
			})
		}
		if(user.length == 0) {
			return res.json({message: messages.user_not_found});
		}
		User.update({"_id": user._id }, newData, function(err, status) {
			if(err) {
				res.status(400)
				return res.json({
					reason: err.toString()
				})
			}
			console.log("Update status: ", status);
			res.json({message: "updated"})
		})
	})
}

exports.removeUser = function(req, res) {
	if(typeof req.params.id === "undefined") {
		return res.json({ message: "ID" + messages.missing });
	}
	if(req.params.id.length != 24) {
		return res.json({ message: messages.valid + " ID" });
	}	
	User.find({
		"_id": req.params.id
	}, function(err, user) {
		if(err) {
			res.status(400)
			return res.json({
				reason: err.toString()
			})
		}
		if(user.length == 0) {
			return res.json({message: messages.user_not_found});
		}
		User.remove({ "_id": req.params.id }, function(err, status) {
			if(err) {
				res.status(400)
				return res.json({
					reason: err.toString()
				})
			}
			console.log(status);
			res.json({message: "removed"});
		})
	})
}