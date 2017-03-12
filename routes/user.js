'use strict';
var express = require("express");
var UserController = require("../controllers/user");
var authenticated_1 = require("../middlewares/authenticated");
//var express = require('express');
//var UserController = require('../controllers/user');
var api = express.Router();
exports.api = api;
api.get('/probando-controlador', authenticated_1.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/userUpdate/:id', authenticated_1.ensureAuth, UserController.userUpdate);
//# sourceMappingURL=user.js.map