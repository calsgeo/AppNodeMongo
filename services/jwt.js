'use strict';
var jwtSimple = require("jwt-simple");
var moment = require("moment");
var secret = 'clave_secreta_curso';
exports.createToken = function (user) {
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
};
//# sourceMappingURL=jwt.js.map