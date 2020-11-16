import express from 'express'
import { validate, verifyUser } from './validator'
import * as hecomponent from './controller'
import { exceptionHandler } from '../../../util/errorHandler'
export const router = express.Router()

// Crear hemocomponente
router.post(
  '/',
  validate('create'),
  verifyUser,
  exceptionHandler(hecomponent.createTransfusion)
)
