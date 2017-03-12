'use strict';
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});
var User = mongoose.model('User', UserSchema);
exports.User = User;
//# sourceMappingURL=user.js.map