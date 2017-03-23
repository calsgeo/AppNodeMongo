'use strict'

import {Document, model, Model, Schema} from 'mongoose';
import {ISong} from '../interfaces/song';

const SongSchema: Schema = new Schema({
    number: Number,
    name: String,
    duration: Number,
    file: String,
    artist:{
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

export const SongModel: Model<ISong> = model<ISong>('Song', SongSchema);