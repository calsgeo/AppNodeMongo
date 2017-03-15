'use strict';
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = 'MiClaveSecreta';
/**
 * Valida el token enviado por el usuario si es valido o ya expiro
 *
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 * @param {any} next Funcion para salir del middleware
 * @returns
 */
function ensureAuth(req, res, next) {
    // el Next se usa para salir del middleware
    //Revisa si la solicitud enviada por el usuario tiene en su cabecera un token
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene cabecera de autenticación' });
    }
    // Limpia las comillas sencillas y dobles del token para enviarlo limpio a la solicitud
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        // Recupera los datos decodificados
        var payload = jwt.decode(token, secret);
        // Valida el tiempo de expiracion del token para determinar si aun es valido o no
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' });
        }
        console.log('Token aceptado');
        req.user = payload;
    }
    catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'Token no válido' });
    }
    next();
}
exports.ensureAuth = ensureAuth;
;
//# sourceMappingURL=authenticated.js.map