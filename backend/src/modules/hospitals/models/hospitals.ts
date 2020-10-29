import { Schema, Document, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IHospital from './IHospital'

import mongoose from 'mongoose'

const autoIndex = process.env.NODE_ENV !== 'production'

const HospitalSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    savedInBlockchain: { type: Boolean, default: false },
  },
  { autoIndex }
)

HospitalSchema.index({ id: 1 })

HospitalSchema.plugin(mongoosePaginate)

type HospitalModel<T extends Document> = PaginateModel<T>

// Export the model and return your IHospital interface

export default (mongoose.models.hospitals as HospitalModel<IHospital>) ||
  (mongoose.model<IHospital>('hospitals', HospitalSchema) as HospitalModel<
    IHospital
  >)
