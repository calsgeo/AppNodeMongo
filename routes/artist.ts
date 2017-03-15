'use strict'

import * as express from 'express';
import * as ArtistController from '../controllers/artist';
import {ensureAuth as md_auth} from '../middlewares/authenticated';

var api = express.Router();

// Direcciones del servicio y los requerimientos adicionales para consumirlas

api.get('/artist/:id', md_auth, ArtistController.getArtist); // Es obligatorio incluir el id en la ruta
api.post('/saveArtist', md_auth, ArtistController.saveArtist);

export {api};