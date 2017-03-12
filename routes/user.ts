'use strict'

import * as express from 'express';
import * as UserController from '../controllers/user';
import {ensureAuth as md_auth} from '../middlewares/authenticated'

//var express = require('express');
//var UserController = require('../controllers/user');

var api = express.Router();

api.get('/probando-controlador', md_auth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/userUpdate/:id', md_auth, UserController.userUpdate);

export {api};