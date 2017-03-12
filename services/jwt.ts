'use strict'

import * as jwtSimple from 'jwt-simple';
import * as moment from 'moment';

var secret = 'clave_secreta_curso';

var createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        apellido: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fecha de creacion -> tipo timestamp
        exp: moment().add(30, 'days').unix // fecha de vencimiento
    };

    return jwtSimple.encode(payload, secret);
};

export{createToken}