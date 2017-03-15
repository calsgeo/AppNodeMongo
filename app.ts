'use strict'

import * as express from 'express';
import * as bodyParser from 'body-parser';

var app = express();

//  cargar rutas para cada uno de los controladores
import {api as user_routes} from './routes/user';
import {api as artist_routes} from './routes/artist';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app. use('/api', user_routes);
app. use('/api', artist_routes);

export {app};