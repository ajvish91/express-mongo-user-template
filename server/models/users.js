var mongoose = require('mongoose'),
	utilities = require('../config/utilities');

var UserSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: '{PATH} is required'
	},
	lastname: {
		type: String,
		required: '{PATH} is required'
	},
	username: {
		type: String,
		unique: true,
		required: '{PATH} is required'
	},
	salt: {
		type: String,
		required: '{PATH} is required'
	},
	hashed_pwd: {
		type: String,
		required: '{PATH} is required'
	},
	roles: [String]
});
UserSchema.methods = {
	authenticate: function(passwordToMatch) {
		return utilities.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	}
}
var User = mongoose.model("User", UserSchema);