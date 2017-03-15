'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
exports.app = app;
//  cargar rutas para cada uno de los controladores
var user_1 = require("./routes/user");
var artist_1 = require("./routes/artist");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configurar cabeceras http
//rutas base
app.use('/api', user_1.api);
app.use('/api', artist_1.api);
//# sourceMappingURL=app.js.map