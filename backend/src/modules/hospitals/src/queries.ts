import hospitals from '../models/hospitals'
import IHospital from '../models/IHospital'
import mongoose, { ClientSession } from 'mongoose'

export const getObjectId = (_id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(_id)
}

export const findHospitalById = async (hospital: {
  id: string
  name: string
}): Promise<IHospital | null> => {
  return await hospitals.findOne({ id: hospital })
}

export const findHospitals = async (): Promise<IHospital[]> => {
  return await hospitals.find().exec()
}

export const createHospital = async (hospital: {
  id: string
  name: string
}): Promise<IHospital> => {
  // @ts-ignore
  return await hospitals.create(hospital)
}

export const updateObjectBlockchainStatus = async (
  hospital,
  status: boolean
): Promise<void> => {
  const dbHospital = await hospitals.findById(getObjectId(hospital._id))
  if (!dbHospital) {
    console.error('No existe el hospital')
  } else {
    dbHospital.savedInBlockchain = status
    await dbHospital.save()
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
