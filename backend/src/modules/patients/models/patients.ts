import { Schema, Document, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import IPatient from './IPatient'

import mongoose from 'mongoose'

const autoIndex = process.env.NODE_ENV !== 'production'

const PatientSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    savedInBlockchain: { type: Boolean, default: false },
  },
  { autoIndex }
)

PatientSchema.index({ id: 1 })

PatientSchema.plugin(mongoosePaginate)

type PatientModel<T extends Document> = PaginateModel<T>

// Export the model and return your IHospital interface

export default (mongoose.models.patients as PatientModel<IPatient>) ||
  (mongoose.model<IPatient>('patients', PatientSchema) as PatientModel<
    IPatient
  >)
