'use strict'

import {Document, Schema} from 'mongoose';

export interface IArtist extends Document {
    name: String;
    description: String;
    image: String;
}