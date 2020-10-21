import { Schema, Document, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IHemocomponent from './IHemocomponent'

import mongoose from 'mongoose'

const autoIndex = process.env.NODE_ENV !== 'production'

const HemocomponentSchema = new Schema(
  {
    id: { type: String, required: true },
    bloodType: { type: String, required: true },
    savedInBlockchain: { type: Boolean, default: false },
  },
  { autoIndex }
)

HemocomponentSchema.index({ id: 1 })

HemocomponentSchema.plugin(mongoosePaginate)

type HemocomponentModel<T extends Document> = PaginateModel<T>

// Export the model and return your IHemocomponent interface

export default (mongoose.models.hemocomponents as HemocomponentModel<
  IHemocomponent
>) ||
  (mongoose.model<IHemocomponent>(
    'hemocomponents',
    HemocomponentSchema
  ) as HemocomponentModel<IHemocomponent>)
