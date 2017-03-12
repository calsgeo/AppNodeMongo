'user strict';
"use strict";
var bcrypt = require("bcrypt-nodejs");
var user_1 = require("../models/user");
var jwt_1 = require("../services/jwt");
function pruebas(req, res) {
    res.status(200).send({
        message: "Probando una acción del controlador de usuarios del API rest con Node y Mongo"
    });
}
exports.pruebas = pruebas;
function saveUser(req, res) {
    var user = new user_1.User();
    var params = req.body;
    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = null;
    if (params.password) {
        // Encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                // Guardar el usuario
                user.save(function (err, userStored) {
                    if (err) {
                        res.status(500).send({ mesage: 'Error al guardar al usuario' });
                    }
                    else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        }
                        else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            }
            else {
                res.status(200).send({ message: 'Rellena todos los campos' });
            }
        });
    }
    else {
        res.status(200).send({ message: 'introduce la contraseña' });
    }
}
exports.saveUser = saveUser;
function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    user_1.User.findOne({ email: email.toLowerCase() }, function (err, user) {
        if (err) {
            res.status(500).send({ message: 'error en la petición' });
        }
        else {
            if (!user) {
                res.status(404).send({ message: 'usuario no existe' });
            }
            else {
                // Validación contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        //Devolver los datos del usuario registrado
                        if (params.getHash) {
                            //devolver un token de jwt
                            //res.status(200).send({message: "El usuario está OK"});
                            res.status(200).send({
                                token: jwt_1.createToken(user)
                            });
                        }
                        else {
                            console.log("retorna los datos del usuario");
                            res.status(200).send({ user: user });
                        }
                    }
                    else {
                        res.status(404).send({ message: 'el usuario no ha podido ingresar' });
                    }
                });
            }
        }
    });
}
exports.loginUser = loginUser;
function userUpdate(req, res) {
    var userId = req.params.id;
    var update = req.body;
    user_1.User.findByIdAndUpdate(userId, update, function (err, userUpdate) {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        }
        else {
            if (!userUpdate) {
                res.status(404).send({ message: "No se ha podido actualizar el usuario" });
            }
            else {
                res.status(200).send({ user: update });
            }
        }
    });
}
exports.userUpdate = userUpdate;
//# sourceMappingURL=user.js.map