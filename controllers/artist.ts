'use strict'

import * as fs from 'fs';
import * as path from 'path';

import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {Song} from '../models/song';


/**
 * Retorna la información del artista enviado en la solicitud
 * 
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API  
 * @param {any} res Respuesta generada por el servicio  
 */

export function getArtist(req, res) {
    var artistId = req.params.id;

    // Busca al artista por su id, en el caso de no encontrarlo retorna un mensaje de error
    Artist.findById(artistId,(err,artist) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!artist) {
                res.status(404).send({message: 'El artista no existe'});
            } else {
                res.status(200).send({artist});
            }
        }
    });
}

/**
 *  Almacena la información suministrada por el usuario sobre el nuevo artista en la base de datos. No realiza validaciones si el artista ya existe.
 * 
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API 
 * @param {any} res Respuesta generada por el servicio 
 */
export function saveArtist(req, res){
    var artist = new Artist();
    var params = req.body;
    
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored)=>{
        if(err){
            res.status(500).send({message: 'error al guardar el artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'No se guardó el artista'});
            }else{
                res.status(200).send({artist: artistStored});
            }

        }
    });
}