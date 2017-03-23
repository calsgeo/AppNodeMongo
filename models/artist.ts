'use strict'

import {PaginateModel, Document, Schema, model} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import {IArtist} from '../interfaces/artist';

const ArtistSchema: Schema = new Schema({
    name: String,
    description: String,
    image: String
});

ArtistSchema.plugin(mongoosePaginate);

interface ArtistModel<T extends Document> extends PaginateModel<T> {}

export const ArtistModel: ArtistModel<IArtist> = model<IArtist>('Artist', ArtistSchema);