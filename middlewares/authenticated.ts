'use strict'


import * as jwt from 'jwt-simple';
import * as moment from 'moment';

var secret = 'clave_secreta_curso';

export var ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene cabecera de autenticación'})
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        let payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
        console.log ('Token aceptado')
        req.user = payload;
    }catch(error){
        console.log(error);
        return res.status(404).send({message: 'Token no válido'});
    }

    next();
};