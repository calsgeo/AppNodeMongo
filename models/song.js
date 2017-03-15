'use strict';
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var SongSchema = Schema({
    number: Number,
    name: String,
    duration: String,
    file: String,
    album: {
        type: Schema.ObjectId,
        ref: 'Album'
    }
});
var Song = mongoose.model('Song', SongSchema);
exports.Song = Song;
//# sourceMappingURL=song.js.map