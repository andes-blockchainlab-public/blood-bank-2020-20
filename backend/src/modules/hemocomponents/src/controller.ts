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
export const createHemocomponent = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const id = req.body.id
    const bloodType = req.body.bloodType

    const data = await blockchain.getData(blockchain.getAddress(id))
    if (data[0]) {
      throw new CustomError('Ya existe un hemocomponente con este id', 422)
    }
    sendMessage('SAVED_HEMOCOMPONENT_DB', {
      owner: req.user?.email,
      id,
      bloodType,
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
 * Actualiza un hemocomponente
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const updateHemocomponent = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  validationErrorHandler(req)
  try {
    const id = req.body.id
    const bloodType = req.body.bloodType

    const data = await blockchain.getData(blockchain.getAddress(id))
    if (!data[0]) {
      throw new CustomError(
        'No se encuentra un hemocomponente con este id',
        404
      )
    }

    sendMessage('UPDATED_HEMOCOMPONENT_DB', {
      owner: req.user?.email,
      id,
      bloodType,
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
 * Busca todos los hemocomponentes
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const getHemocomponentById = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const data = await blockchain.getData(blockchain.getAddress(req.params.id))
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
 * Busca todos los hemocomponentes
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const getAllHemocomponents = async function (
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
