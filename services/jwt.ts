'use strict'

import * as jwtSimple from 'jwt-simple';
import * as moment from 'moment';

var secret = 'MiCLaveSecreta';

/**
 * Recupera los datos del usuario y los encripta, Crea el token y le asigna su vigencia
 * 
 * @export
 * @param {any} user 
 * @returns 
 */
export function createToken(user){
    var payload = {
        sub: user._id,
        name: user.name,
        apellido: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fecha de creacion -> tipo timestamp
        exp: moment().add(30, 'minutes').unix() // fecha de vencimiento
    };

    return jwtSimple.encode(payload, secret);
};