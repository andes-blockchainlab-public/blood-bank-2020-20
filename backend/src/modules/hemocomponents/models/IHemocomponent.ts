import { Document } from 'mongoose'

export default interface IHemocomponent extends Document {
  id: string
  bloodType: string
  savedInBlockchain: boolean
}
