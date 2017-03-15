'use strict';
var jwtSimple = require("jwt-simple");
var moment = require("moment");
var secret = 'MiClaveSecreta';
/**
 * Recupera los datos del usuario y los encripta, Crea el token y le asigna su vigencia
 *
 * @export
 * @param {any} user
 * @returns
 */
function createToken(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        apellido: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'minutes').unix() // fecha de vencimiento
    };
    return jwtSimple.encode(payload, secret);
}
exports.createToken = createToken;
;
//# sourceMappingURL=jwt.js.map