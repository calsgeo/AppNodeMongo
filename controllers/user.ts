'user strict'

import * as bcrypt from 'bcrypt-nodejs';
import {User} from '../models/user';
import {createToken} from '../services/jwt';
import * as fs from 'fs';
import * as path from 'path';


export function pruebas(req, res) {
    res.status(200).send({
        message: "Probando una acción del controlador de usuarios del API rest con Node y Mongo"
    });
}

export function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = null;

    if (params.password){
        // Encriptar contraseña y guardar datos
        bcrypt.hash(params.password,null,null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                // Guardar el usuario
                user.save((err,userStored) =>{
                    if(err){
                        res.status(500).send({mesage: 'Error al guardar al usuario'});
                    }else{
                        if(!userStored){
                        res.status(404).send({message: 'No se ha registrado el usuario'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                    }
                })
            }else{
                res.status(200).send({message: 'Rellena todos los campos'});

            }
        });
    }else{
        res.status(200).send({message: 'introduce la contraseña'});
    }
}

export function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne ({email:email.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500).send({message: 'error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'usuario no existe'});
            }else{
                // Validación contraseña
                bcrypt.compare(password, user.password, (err, check) => {
                    if(check){
                        //Devolver los datos del usuario registrado
                        if(params.getHash){
                            //devolver un token de jwt
                            //res.status(200).send({message: "El usuario está OK"});
                            res.status(200).send({
                                token: createToken(user)
                            })
                        }else{
                            console.log("retorna los datos del usuario");
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'el usuario no ha podido ingresar'});
                    }
                });
            }
        }
    });
}

export function userUpdate(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else {
            if(!userUpdate){
                res.status(404).send({message: "No se ha podido actualizar el usuario"});
            }else {
                res.status(200).send({user: update});
            }
        }
    });
}

export function uploadImage(req, res){
    var userId = req.params.id;

    if(req.files){
        let filePath = req.files.image.path;
        let filePathSplit = filePath.split('/');
        let fileName = filePathSplit[filePathSplit.length-1];
        let fileNameSplit = fileName.split('.');
        let fileExtension = fileNameSplit[fileNameSplit.length-1].toLowerCase();

        console.log(filePath);
        console.log(fileName);
        
        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'gif':
                console.log(fileExtension);
                User.findByIdAndUpdate(userId, {image: fileName}, (err, userUpdate) => {
                    if(!userUpdate){
                        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                    }else {
                        if(!userUpdate){
                            res.status(404).send({message: "No se ha podido actualizar el usuario"});
                        }else {
                            res.status(200).send({user: userUpdate});
                        }
                    }
                });
                break;
            default:
                res.status(500).send({message: 'Extensión de archivo no válida'});
        }
    }else{
        res.status(500).send({message: '¡No ha cargado una imagen!'});
    }
}

export function getImageFile(req, res) {
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/users/'+ imageFile;

    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: '¡Imagen inexistente!'});
        }
    });
}