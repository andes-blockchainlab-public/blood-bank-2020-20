import express from 'express'
export const router = express.Router()

import { validationErrorHandler } from './validator'
import { sendMessage } from '../../../util/kafka'
import { CustomError } from '../../../util/errorHandler'
import * as blockchain from './blockchain'

/**
 * Crea un hemocomponente
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const createTransfusion = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const hemocomponentId = req.body.hemocomponentId
    const patientId = req.body.patientId
    console.log('Llego acá controller 1')
    const data = await blockchain.getData(
      blockchain.getPatientsAddress(patientId)
    )
    console.log('Llego acá controller data:', data)
    if (!data[0]) {
      throw new CustomError('No se encuentra un paciente con este id', 422)
    }
    const data2 = await blockchain.getData(
      blockchain.getHemocomponentsAddress(hemocomponentId)
    )
    if (!data2[0]) {
      throw new CustomError(
        'No se encuentra un hemocomponente con este id',
        422
      )
    }
    console.log('Llego acá controller 2')
    sendMessage('TRANSFER_HEMOCOMPONENT', {
      author: req.user?.email,
      ips: process.env.ID_IPS,
      hemocomponentId,
      patientId,
      adverseReactions: [],
    })
    console.log('Llego acá controller 3 T')
    res.status(200).json({ patientId, hemocomponentId })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * Crea un hemocomponente
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const addAdverseReaction = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const hemocomponentId = req.body.hemocomponentId
    const patientId = req.body.patientId
    const symptom = req.body.symptom
    console.log('Llego acá controller 1')
    const data = await blockchain.getData(
      blockchain.getPatientsAddress(patientId)
    )
    console.log('Llego acá controller data:', data)
    if (!data[0]) {
      throw new CustomError('No se encuentra un paciente con este id', 422)
    }
    const data2 = await blockchain.getData(
      blockchain.getHemocomponentsAddress(hemocomponentId)
    )
    if (!data2[0]) {
      throw new CustomError(
        'No se encuentra un hemocomponente con este id',
        422
      )
    }
    console.log('Llego acá controller 2')
    sendMessage('ADVERSE_REACTION_HEMOCOMPONENT', {
      author: req.user?.email,
      ips: process.env.ID_IPS,
      hemocomponentId,
      patientId,
      symptom,
    })
    console.log('Llego acá controller 3')
    res.status(200).json({ patientId, hemocomponentId })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}
