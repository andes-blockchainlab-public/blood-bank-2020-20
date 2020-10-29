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
export const createHospital = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const id = req.body.id
    const name = req.body.name

    const hospital = await queries.createHospital({ id, name })
    sendMessage('RegistrarHospitalBD', {
      owner: req.user?.email,
      ...hospital.toObject(),
    })

    res.status(200).json(hospital)
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
export const getAllHospitals = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const hospitals = await queries.findHospitals()
    res.status(201).json(hospitals)
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}
