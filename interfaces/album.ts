'use strict'

import {Document, Schema} from 'mongoose';

export interface IAlbum extends Document {
    title: String;
    description: String;
    year: Number;
    image: String;
    artist: Schema.Types.ObjectId;
}