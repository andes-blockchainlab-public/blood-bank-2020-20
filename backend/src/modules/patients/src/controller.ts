import express from 'express'
export const router = express.Router()

import { validationErrorHandler } from './validator'
import { sendMessage } from '../../../util/kafka'
import { CustomError } from '../../../util/errorHandler'
import * as blockchain from './blockchain'

/**
 * Crea un paciente
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
    const bloodType = req.body.bloodType
    const name = req.body.name
    console.log('Llego acá controller 1')
    const data = await blockchain.getData(blockchain.getAddress(id))
    console.log('Llego acá controller data:', data)
    if (data[0]) {
      throw new CustomError('Ya existe un paciente con este id', 422)
    }
    console.log('Llego acá controller 2')
    sendMessage('SAVE_PATIENT', {
      author: req.user?.email,
      ips: process.env.ID_IPS,
      id,
      bloodType,
      transfusions: [],
      name,
    })
    console.log('Llego acá controller 3')
    res
      .status(201)
      .json({ id, bloodType, name, ips: process.env.ID_IPS, transfusions: [] })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * Actualiza un paciente
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const updatePatient = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const id = req.body.id
    const bloodType = req.body.bloodType
    const name = req.body.name

    const data = await blockchain.getData(blockchain.getAddress(id))
    if (!data[0]) {
      throw new CustomError('No se encuentra un paciente con este id', 404)
    }

    sendMessage('UPDATE_PATIENT', {
      author: req.user?.email,
      ips: process.env.ID_IPS,
      id,
      bloodType,
      name,
    })

    res.status(200).json({ id, bloodType })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * Busca todos los pacientes
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const getPatientById = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const id = req.params.id
    const data = await blockchain.getData(blockchain.getAddress(id))
    if (!data[0]) {
      res.status(200).json(null)
    }
    res.status(201).json(data[0])
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * Busca todos los pacientes
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const getAllPatients = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const data = await blockchain.getData(blockchain.getBase())
    console.log(data)
    res.status(201).json(data)
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}
