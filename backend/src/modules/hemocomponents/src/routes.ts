import express from 'express'
import { validate, verifyUser } from './validator'
import * as hecomponent from './controller'
import { exceptionHandler } from '@/util/errorHandler'
export const router = express.Router()

// Listar hemocomponente
router.get('/', exceptionHandler(hecomponent.getAllHemocomponents))

// Crear hemocomponente
router.post(
  '/',
  validate('create'),
  verifyUser,
  exceptionHandler(hecomponent.createHemocomponent)
)

// Actualizar hemocomponente
router.put(
  '/',
  validate('update'),
  verifyUser,
  exceptionHandler(hecomponent.updateHemocomponent)
)
