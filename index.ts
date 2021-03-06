'use strict'

import * as mongoose from 'mongoose';
import {app} from './app';

var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/bdMusic',(err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La conexion a la BD fue exitosa");

        app.listen(port, function(){
            console.log("Servidor del api rest de musica escuchando en MongoDB http://localhost:" + port);
        })
    }
});