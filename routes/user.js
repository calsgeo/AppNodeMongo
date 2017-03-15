'use strict';
var express = require("express");
var UserController = require("../controllers/user");
var authenticated_1 = require("../middlewares/authenticated");
var multipart = require("connect-multiparty");
//var express = require('express');
//var UserController = require('../controllers/user');
var api = express.Router();
exports.api = api;
var md_upload = multipart({ uploadDir: './uploads/users' });
api.get('/probando-controlador', authenticated_1.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/userUpdate/:id', authenticated_1.ensureAuth, UserController.userUpdate);
api.put('/uploadImageUser/:id', [authenticated_1.ensureAuth, md_upload], UserController.uploadImage);
api.get('/getImageUser/:imageFile', UserController.getImageFile);
//# sourceMappingURL=user.js.map