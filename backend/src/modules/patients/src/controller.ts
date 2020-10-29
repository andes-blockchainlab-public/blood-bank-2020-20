import express from 'express'
export const router = express.Router()
import * as queries from './queries'
import { validationErrorHandler } from './validator'
import { sendMessage } from '../../../util/kafka'

/**
 * Crea un hospitale
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const createPatient = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const id = req.body.id
    const name = req.body.name
    const patient = await queries.createPatient({ id, name })
    sendMessage('RegistrarPacienteBD', {
      owner: req.user?.email,
      ...patient.toObject(),
    })

    res.status(200).json(patient)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * Busca todos los hospitales
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const getAllPatients = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const patients = await queries.findPatients()
    res.status(201).json(patients)
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}
