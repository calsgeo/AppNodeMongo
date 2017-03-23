'use strict'

import { Document, model, Model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const UserSchema: Schema = new Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: String,
    image: String
});

export const UserModel: Model <IUser> = model <IUser> ('User', UserSchema);