'use strict'

import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = require('bluebird');


var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

ArtistSchema.plugin(mongoosePaginate);

var Artist = mongoose.model('Artist', ArtistSchema);
export {Artist};