import express from 'express'
export const router = express.Router()

import { router as authRoutes } from './modules/auth/src/routes'
import { router as hemocomponentsRoutes } from './modules/hemocomponents/src/routes'

router.use('/auth', authRoutes)
router.use('/hemocomponents', hemocomponentsRoutes)