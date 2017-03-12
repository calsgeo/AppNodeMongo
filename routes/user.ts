'use strict'

import * as express from 'express';
import {pruebas, saveUser, loginUser } from "../controllers/user";

//var express = require('express');
//var UserController = require('../controllers/user');

var api = express.Router();

api.post('/register', saveUser);
api.post('/login', loginUser);

export {api};