'user strict'

import * as bcrypt from 'bcrypt-nodejs';

import * as fs from 'fs';
import * as path from 'path';
import {UserModel as User} from '../models/user';
import {createToken} from '../services/jwt';

/**
 * Valida el token enviado por /getToken
 * 
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
export function validateToken(req, res) {
    //console.log(req);
    var params = req.body;
    res.status(200).send({
        message: "Token Valido"
    });
}


/**
 * Valida que el formato de archivo de imagen sea válido. En el caso que no sea así, elimina el archivo almacenado por multer.
 * 
 * @param {any} image recibe el req.file del requerimiento del usuario
 * @returns {string} retorna un string según el resultado de la validación del archivo de imagen: nulo (no hay archivo), nombre del archivo (tipo de archivo válido), undefined (el formato de archivo no es válido y llama a la función deleteImage para eliminar el archivo)
 */
function validateImage(image):string{
    if(typeof image === 'undefined'){
        return 'null';
    } else {
        // Valida que el formato del archivo sea valido y posteriormente actualiza el registro
        switch (image.mimetype) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                return image.filename;
            default:
                deleteImage(image);
                return 'undefined';
        }
    }
}

/**
 * Elimina un archivo de imagen
 * 
 * @param {any} image Recibe la imagen que será eliminada.
 */
function deleteImage(image: String){

    fs.stat('./uploads/users/' + image, (err, exist) => {
        if(exist){
            fs.unlink('./uploads/users/' + image,(err) => {
                if(err){
                    console.log(err);
                }
                console.log('Archivo eliminado correctamente');
            });
        } else {
            console.log(err);
        }
    });
}
/**
 * Registra el usuario en la base de datos
 *  
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
export function saveUser(req, res) {
    // Consume el schema de usuario de la base de datoss
    var user = new User();
    // asigna los parametros enviados por register al schema
    var params = req.body;
    //console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email.toLowerCase();
    user.role = 'ROLE_USER';
    user.image = validateImage(req.file);

    if(user.image == 'undefined'){
        res.status(500).send({message: 'Error de procesamiento. Formato de imagen no válido'});
        return;
    }

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
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            mesage: 'Error al guardar al usuario'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                })
            } else {
                res.status(200).send({
                    message: 'Rellena todos los campos'
                });

            }
        });
    } else {
        res.status(200).send({
            message: 'introduce la contraseña'
        });
    }
}

/**
 * 
 * Valida los datos enviados (email y contraseña) contra los datos almacenados en la BD y retorna los datos del usuario (contraseña encriptada)
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
export function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    // Busca un registro en la base de datos a partir del correo electronico

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'error en la petición'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'usuario no existe'
                });
            } else {
                // Despues de validar la existencia del correo electronico valida su contraseña
                bcrypt.compare(password, user.password.toString(), (err, check) => {
                    if (check) {
                        //Retorna los datos del usuario registrado
                        if (params.getHash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: createToken(user)
                            })
                        } else {
                            console.log("retorna los datos del usuario");
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: 'el usuario no ha podido ingresar'
                        });
                    }
                });
            }
        }
    });
}

/**
 * Actualiza la información de un usuario existente en la base de datos, recibe todos los campos que el usuario ingrese
 * 
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
export function userUpdate(req, res) {
    let userId = req.params.id;
    let update = req.body;
    let userImage: String;

    // busca el usuario a actualizar y localiza el archivo del avatar
    User.findById(userId, (err, user) =>{
        if (err){
            res.status(500).send({message: 'Error al procesar la solicitud'});
            return;
        } else {
            if (!user){
                res.status(404).send({message: 'Usuario no encontrado en la busqueda'});
                return;
            } else {
                console.log("archivo de imagen a eliminar es: " + user.image);
                userImage = user.image;
                var imagenEliminar = userImage;
            }
        }
    })
    // valida la imagen nueva
    var image = validateImage(req.file);
    console.log('valor de variable image es : ' + image);
    if (image == 'undefined') {
        res.status(500).send({message: 'Error de procesamiento: El tipo de archivo para la imagen no es válido, use jpeg, png, gif'});
    } else {
        if (image == 'null') {
            console.log('Actualizacion sin imagen');
                console.log('imagen a eliminar :' + imagenEliminar);
                update.image = userImage;
            console.log('imagen a actualizar con image null : ' + update.image);
        }else {
            update.image = image;
        }

    }
    // Busca en la BD por el id recuperado al hacer el login 
    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        } else {
            if (!userUpdate) {
                res.status(404).send({
                    message: "No se ha podido actualizar el usuario"
                });
            } else {
                if (update.image == 'null'){
                    console.log('imagen vieja ' + userImage);
                    update.image = userImage;
                    console.log('imagen nueva ' + update.image);
                    res.status(200).send({user: userUpdate});
                }else{
                    res.status(200).send({user: userUpdate});
                    deleteImage(userImage);
                }
            }
        }
    });
}

/**
 * Retorna el avatar del usuario almacenado en la BD
 * 
 * @export
 * @param {any} req Parametros enviados por el cliente a traves de la API
 * @param {any} res Respuesta generada por el servicio
 */
export function getImageFile(req, res) {
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/users/' + imageFile;

    // Busca y retorna el archivo de imagen almagenado para el usuario
    fs.stat(pathFile, (err, exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({message: '¡Imagen inexistente!'});
        }
    });
}