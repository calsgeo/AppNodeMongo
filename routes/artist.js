'use strict';
var express = require("express");
var ArtistController = require("../controllers/artist");
var authenticated_1 = require("../middlewares/authenticated");
var api = express.Router();
exports.api = api;
// Direcciones del servicio y los requerimientos adicionales para consumirlas
api.get('/artist/:id', authenticated_1.ensureAuth, ArtistController.getArtist); // Es obligatorio incluir el id en la ruta
api.post('/saveArtist', authenticated_1.ensureAuth, ArtistController.saveArtist);
//# sourceMappingURL=artist.js.map