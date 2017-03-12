'use strict'

import * as mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

//var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    year: Number,
    image: String,
    artist: {type: Schema.ObjectId, ref: 'Artist'}
});

module.exports = mongoose.model('Album',AlbumSchema);