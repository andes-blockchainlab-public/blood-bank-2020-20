import { sendMessage } from './util/kafka'
import express from 'express'
export const router = express.Router()
import * as queries from './queries'

import { validationErrorHandler } from './validator'

/**
 * Hace login
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

    const hemocomponent = await queries.createHemocomponent({ id, bloodType })

    res.status(200).json(hemocomponent)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * Hace login
 * @param req.body.email email del usuario
 * @param req.body.password contraseña del usuario
 */
export const getAllHemocomponents = async function (
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const hemocomponents = await queries.findHemocomponents()
    res.status(201).json(hemocomponents)
    sendMessage('holi hemocomponentes')
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
    throw err
  }
}
