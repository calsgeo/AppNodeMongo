'use strict';
var express = require("express");
var user_1 = require("../controllers/user");
//var express = require('express');
//var UserController = require('../controllers/user');
var api = express.Router();
exports.api = api;
api.post('/register', user_1.saveUser);
api.post('/login', user_1.loginUser);
//# sourceMappingURL=user.js.map