import { Document } from 'mongoose'

export default interface IPatients extends Document {
  id: string
  name: string
  savedInBlockchain: boolean
}
