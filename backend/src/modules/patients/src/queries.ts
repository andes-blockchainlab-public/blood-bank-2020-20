import patients from '../models/patients'
import IPatients from '../models/IPatient'
import mongoose, { ClientSession } from 'mongoose'

export const getObjectId = (_id: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(_id)
}

export const findPatientById = async (patient: {
  id: string
  name: string
}): Promise<IPatients | null> => {
  return await patients.findOne({ id: patient })
}

export const findPatients = async (): Promise<IPatients[]> => {
  return await patients.find().exec()
}

export const createPatient = async (patient: {
  id: string
  name: string
}): Promise<IPatients> => {
  // @ts-ignore
  return await patients.create(patient)
}

export const updateObjectBlockchainStatus = async (
  patient,
  status: boolean
): Promise<void> => {
  const dbPatient = await patients.findById(getObjectId(patient._id))
  if (!dbPatient) {
    console.error('No existe el paciente')
  } else {
    dbPatient.savedInBlockchain = status
    await dbPatient.save()
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
