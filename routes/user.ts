'use strict'

import * as express from 'express';
import * as UserController from '../controllers/user';
import {ensureAuth as md_auth} from '../middlewares/authenticated';
import * as multipart from 'connect-multiparty';

var api = express.Router();

var md_upload = multipart({ uploadDir: './uploads/users'});

// Direcciones del servicio y los requerimientos adicionales para consumirlas

api.get('/getToken', md_auth, UserController.getToken);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/userUpdate/:id', md_auth, UserController.userUpdate);
api.put('/uploadImageUser/:id', [md_auth, md_upload], UserController.uploadImage);
api.get('/getImageUser/:imageFile', UserController.getImageFile);

export {api};