'use strict'

import {Document, model, Model, Schema} from 'mongoose';
import {IAlbum} from '../interfaces/album';

const AlbumSchema: Schema = new Schema ({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

export const AlbumModel: Model<IAlbum> = model<IAlbum> ('Album', AlbumSchema);