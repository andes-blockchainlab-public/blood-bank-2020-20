import express from 'express'
import { validate, verifyUser } from './validator'
import * as patients from './controller'
import { exceptionHandler } from '../../../util/errorHandler'
export const router = express.Router()

// Traer paciente por id
router.get('/:id', verifyUser, exceptionHandler(patients.getPatientById))

// Listar pacientes
router.get('/', exceptionHandler(patients.getAllPatients))

// Crear paciente
router.post(
  '/',
  validate('create'),
  verifyUser,
  exceptionHandler(patients.createPatient)
)

// Actualizar paciente
router.put(
  '/',
  validate('update'),
  verifyUser,
  exceptionHandler(patients.updatePatient)
)
