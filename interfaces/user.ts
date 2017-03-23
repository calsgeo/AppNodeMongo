'use strict'

import {Document, Schema} from 'mongoose';

export interface IUser extends Document {
    name: String;
    surname: String;
    email: String;
    password: String;
    role: String;
    image: String;
}