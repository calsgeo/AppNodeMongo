'use strict'

import * as mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

//var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

var Artist = mongoose.model('Artist',ArtistSchema);
export {Artist};