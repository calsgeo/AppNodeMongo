'user strict';
"use strict";
var bcrypt = require("bcrypt-nodejs");
var user_1 = require("../models/user");
var jwt_1 = require("../services/jwt");
var fs = require("fs");
var path = require("path");
/**
 * Valida el token enviado por /getToken
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function getToken(req, res) {
    //console.log(req);
    var params = req.body;
    res.status(200).send({
        message: "Ingreso al Token"
    });
}
exports.getToken = getToken;
/**
 * Registra el usuario en la base de datos
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function saveUser(req, res) {
    // Consume el schema de usuario de la base de datoss
    var user = new user_1.User();
    // asigna los parametros enviados por register al schema
    var params = req.body;
    //console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = null;
    if (params.password) {
        /*
            * Encripta la contraseña y guardar datos, en el caso que no funcione la linea bcrypt.hash(params.password,null,null, function(err, hash){ es necesario activar la linea "let salt... " y la linea bcrypt con parametros no nulos
            * La variable salt contiene la base de la encriptacion, en ese caso seran 10 caracteres.
        */
        //let salt = bcrypt.genSaltSync(10);
        bcrypt.hash(params.password, null, null, function (err, hash) {
            // bcrypt.hash(params.password,salt,function () {}, function(err, hash){
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                // Almacena el usuario en la BD
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
/**
 *
 * Valida los datos enviados (email y contraseña) contra los datos almacenados en la BD y retorna los datos del usuario (contraseña encriptada)
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    // Busca un registro en la base de datos a partir del correo electronico
    user_1.User.findOne({ email: email.toLowerCase() }, function (err, user) {
        if (err) {
            res.status(500).send({ message: 'error en la petición' });
        }
        else {
            if (!user) {
                res.status(404).send({ message: 'usuario no existe' });
            }
            else {
                // Despues de validar la existencia del correo electronico valida su contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        //Retorna los datos del usuario registrado
                        if (params.getHash) {
                            //devolver un token de jwt
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
/**
 * Actualiza la información de un usuario existente en la base de datos, recibe todos los campos que el usuario ingrese
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function userUpdate(req, res) {
    var userId = req.params.id;
    var update = req.body;
    // Busca en la BD por el id recuperado al hacer el login 
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
/**
 * Almacena un archivo de imagen a un usuario almacenado en la base de datos
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function uploadImage(req, res) {
    var userId = req.params.id;
    // En el momento en que el usuario haya seleccionado un archivo de imagen
    if (req.files) {
        // Extrae la ruta, el nombre del archivo y el formato
        var filePath = req.files.image.path;
        var filePathSplit = filePath.split('/');
        var fileName = filePathSplit[filePathSplit.length - 1];
        var fileNameSplit = fileName.split('.');
        var fileExtension = fileNameSplit[fileNameSplit.length - 1].toLowerCase();
        console.log(filePath);
        console.log(fileName);
        // Valida que el formato del archivo sea valido y posteriormente actualiza el registro
        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'gif':
                console.log(fileExtension);
                user_1.User.findByIdAndUpdate(userId, { image: fileName }, function (err, userUpdate) {
                    if (!userUpdate) {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                    }
                    else {
                        if (!userUpdate) {
                            res.status(404).send({ message: "No se ha podido actualizar el usuario" });
                        }
                        else {
                            res.status(200).send({ user: userUpdate });
                        }
                    }
                });
                break;
            default:
                res.status(500).send({ message: 'Extensión de archivo no válida' });
        }
    }
    else {
        res.status(500).send({ message: '¡No ha cargado una imagen!' });
    }
}
exports.uploadImage = uploadImage;
/**
 * Retorna el avatar del usuario almacenado en la BD
 *
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;
    // Busca y retorna el archivo de imagen almagenado para el usuario
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        }
        else {
            res.status(200).send({ message: '¡Imagen inexistente!' });
        }
    });
}
exports.getImageFile = getImageFile;
//# sourceMappingURL=user.js.map