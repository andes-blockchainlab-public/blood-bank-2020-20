import hemocomponents from '../util/models/hemocomponents'
import IHemocomponent from '../util/models/IHemocomponent'
import mongoose, { ClientSession } from 'mongoose'

export const findHemocomponents = async (): Promise<IHemocomponent[]> => {
  return await hemocomponents.find().exec()
}

export const createHemocomponent = async (hemocomponent: {
  id: string
  bloodType: string
}): Promise<IHemocomponent> => {
  return await hemocomponents.create(hemocomponent)
}

// Devuelve un objeto clientSession, el cual representa una transacción
export const getTransaction = async (): Promise<ClientSession> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  return session
}

export const getObjectId = (_id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(_id)
}

// Hace rollback a una transacción
export const rollback = async (t: ClientSession): Promise<void> => {
  await t.abortTransaction()
}

// Hace commit a una transacción
export const commit = async (t: ClientSession): Promise<void> => {
  await t.commitTransaction()
}
