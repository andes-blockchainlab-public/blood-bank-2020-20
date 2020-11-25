import express from 'express'
export const router = express.Router()

import * as swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './util/swagger'
import { router as authRoutes } from './modules/auth/src/routes'
import { router as hemocomponentsRoutes } from './modules/hemocomponents/src/routes'
import { router as patientRoutes } from './modules/patients/src/routes'
import { router as transfusionRoutes } from './modules/transfusions/src/routes'
import { uploadRest } from './util/uploadRest'
import { upload } from './util/multer'

router.use('/servicio-transfusion/auth', authRoutes)
router.use('/servicio-transfusion/hemocomponents', hemocomponentsRoutes)
router.use('/servicio-transfusion/patients', patientRoutes)
router.use('/servicio-transfusion/transfusions', transfusionRoutes)

router.post('/servicio-transfusion/upload', upload.single('file'), uploadRest)

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
