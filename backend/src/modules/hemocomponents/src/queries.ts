import hemocomponents from '../util/models/hemocomponents'
import IHemocomponent from '../util/models/IHemocomponent'
import mongoose, { ClientSession } from 'mongoose'

export const getObjectId = (_id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(_id)
}

export const findHemocomponentById = async (hemocomponent: {
  id: string
  bloodType: string
}): Promise<IHemocomponent | null> => {
  return await hemocomponents.findOne({ id: hemocomponent })
}

export const findHemocomponents = async (): Promise<IHemocomponent[]> => {
  return await hemocomponents.find().exec()
}

export const createHemocomponent = async (hemocomponent: {
  id: string
  bloodType: string
}): Promise<IHemocomponent> => {
  // @ts-ignore
  return await hemocomponents.create(hemocomponent)
}

export const updateObjectBlockchainStatus = async (
  hemocomponent,
  status: boolean
): Promise<void> => {
  const dbHemocomponent = await hemocomponents.findById(
    getObjectId(hemocomponent._id)
  )
  if (!dbHemocomponent) {
    console.error('No existe el hemocomponente')
  } else {
    dbHemocomponent.savedInBlockchain = status
    await dbHemocomponent.save()
  }
}

// Devuelve un objeto clientSession, el cual representa una transacción
export const getTransaction = async (): Promise<ClientSession> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  return session
}

// Hace rollback a una transacción
export const rollback = async (t: ClientSession): Promise<void> => {
  await t.abortTransaction()
}

// Hace commit a una transacción
export const commit = async (t: ClientSession): Promise<void> => {
  await t.commitTransaction()
}
