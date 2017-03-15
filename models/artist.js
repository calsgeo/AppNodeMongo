'use strict';
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
//var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});
var Artist = mongoose.model('Artist', ArtistSchema);
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map