'use strict';
var artist_1 = require("../models/artist");
/**
 * Retorna la información del artista enviado en la solicitud
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function getArtist(req, res) {
    var artistId = req.params.id;
    // Busca al artista por su id, en el caso de no encontrarlo retorna un mensaje de error
    artist_1.Artist.findById(artistId, function (err, artist) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        }
        else {
            if (!artist) {
                res.status(404).send({ message: 'El artista no existe' });
            }
            else {
                res.status(200).send({ artist: artist });
            }
        }
    });
}
exports.getArtist = getArtist;
/**
 *  Almacena la información suministrada por el usuario sobre el nuevo artista en la base de datos. No realiza validaciones si el artista ya existe.
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function saveArtist(req, res) {
    var artist = new artist_1.Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.save(function (err, artistStored) {
        if (err) {
            res.status(500).send({ message: 'error al guardar el artista' });
        }
        else {
            if (!artistStored) {
                res.status(404).send({ message: 'No se guardó el artista' });
            }
            else {
                res.status(200).send({ artist: artistStored });
            }
        }
    });
}
exports.saveArtist = saveArtist;
//# sourceMappingURL=artist.js.map