'use strict'

import * as express from 'express';
import * as bodyParser from 'body-parser';

var app = express();

//  cargar rutas

import {api as user_routes} from './routes/user';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base

app. use('/api', user_routes);



export {app};