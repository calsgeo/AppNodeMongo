'use strict'

import * as express from 'express';
import {pruebas, saveUser, loginUser } from '../controllers/user';
import * as md_auth from '../middlewares/authenticated'

//var express = require('express');
//var UserController = require('../controllers/user');

var api = express.Router();

api.get('/probando-controlador', md_auth.ensureAuth, pruebas);
api.post('/register', saveUser);
api.post('/login', loginUser);

export {api};