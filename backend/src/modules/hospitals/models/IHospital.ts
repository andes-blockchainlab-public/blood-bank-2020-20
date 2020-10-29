import { Document } from 'mongoose'

export default interface IHospital extends Document {
  id: string
  name: string
  savedInBlockchain: boolean
}
