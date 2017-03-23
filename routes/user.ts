'use strict'

import * as express from 'express';
import * as multer from 'multer';
import * as crypto from 'crypto';
import * as mime from 'mime';

import * as UserController from '../controllers/user';
import {ensureAuth as md_auth} from '../middlewares/authenticated';

var api = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/users')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype));
    });
  }
});
var formdata = multer({ storage: storage });


// Direcciones del servicio y los requerimientos adicionales para consumirlas

api.get('/validateToken', md_auth, UserController.validateToken);
api.post('/register', formdata.single('image'), UserController.saveUser);
api.post('/login', formdata.single(),UserController.loginUser);
api.put('/userUpdate/:id', [md_auth, formdata.single('image')], UserController.userUpdate);
api.get('/getImageUser/:imageFile', UserController.getImageFile);

export {api};