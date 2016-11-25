var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Account = mongoose.Schema({
	local: {
		email: String,
		password: String,
	},

	facebook : {
		id: String,
		token: String,
		email: String,
		name: String,
		pictureUrl: String
	},

	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String,
		pictureUrl: String
	},
	google : {
		id: String,
		token: String,
		email: String,
		displayName: String,
		pictureUrl: String
	}
});

Account.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null);
};

Account.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Account', Account);