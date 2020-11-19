import express from 'express'
export const router = express.Router()

import { router as authRoutes } from './modules/auth/src/routes'
import { router as hemocomponentsRoutes } from './modules/hemocomponents/src/routes'
import { router as patientRoutes } from './modules/patients/src/routes'
import { router as transfusionRoutes } from './modules/transfusions/src/routes'

router.use('/servicio-transfusion/auth', authRoutes)
router.use('/servicio-transfusion/hemocomponents', hemocomponentsRoutes)
router.use('/servicio-transfusion/patients', patientRoutes)
router.use('/servicio-transfusion/transfusions', transfusionRoutes)
