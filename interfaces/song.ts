'use strict'

import {Document, Schema} from 'mongoose';

export interface ISong extends Document {
    number: Number;
    name: String;
    duration: Number;
    file: String;
    artist: Schema.Types.ObjectId;
}