import { Document } from 'mongoose'

export default interface IUser extends Document {
  email: string
  name: string
  password?: string
  role: string
  refreshToken: string
}
