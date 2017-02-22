'user strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../modes/user');

function pruebas(req, res){
    res.status(200).send({
        message: "Probando una acción del controlador de usuarios del API rest con Node y Mongo"
    })
}

function saveUser(req, res){
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
module.exports = {
    pruebas,
    saveUser
};