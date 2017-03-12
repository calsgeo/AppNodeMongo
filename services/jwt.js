'use strict';
var jwtSimple = require("jwt-simple");
var moment = require("moment");
var secret = 'clave_secreta_curso';
var createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        apellido: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix // fecha de vencimiento
    };
    return jwtSimple.encode(payload, secret);
};
exports.createToken = createToken;
//# sourceMappingURL=jwt.js.map