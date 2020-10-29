import express from 'express'
import { validate, verifyUser } from './validator'
import * as hospital from './controller'
import { exceptionHandler } from '../../../util/errorHandler'
export const router = express.Router()

// Listar pacientes
router.get('/', exceptionHandler(hospital.getAllPatients))

// Crear paciente
router.post(
  '/',
  validate('create'),
  verifyUser,
  exceptionHandler(hospital.createPatient)
)
