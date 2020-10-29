import express from 'express'
import { validate, verifyUser } from './validator'
import * as hospital from './controller'
import { exceptionHandler } from '@/util/errorHandler'
export const router = express.Router()

// Listar hospitales
router.get('/', exceptionHandler(hospital.getAllHospitals))

// Crear hospital
router.post(
  '/',
  validate('create'),
  verifyUser,
  exceptionHandler(hospital.createHospital)
)
