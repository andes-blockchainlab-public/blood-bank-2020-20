if (process.env.MODE !== 'docker') require('dotenv').config()

import express from 'express'
import cors from 'cors'
require('cross-fetch/polyfill')
import bodyParser from 'body-parser'
import { initDB } from './util/mongoose'
import { initKafkaConnect } from './util/kafka'
import { router } from './routes'
import { exceptionMiddleware } from './util/errorHandler'
import { activateKafkaListeners } from './util/kafka'
import { activateBCEventListeners } from './util/zeromq'

if (process.env.NODE_ENV !== 'verifier') {
  const app = express()

  // Allow all
  app.use(cors())

  app.use(bodyParser.json())

  app.use('/api', router)

  router.use(exceptionMiddleware)

  const PORT = process.env.PORT || 4000
  initDB()
  initKafkaConnect().then(activateKafkaListeners)
  activateBCEventListeners()

  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
  })
}
