if (process.env.MODE !== 'docker') require('dotenv').config()

import {
  createRefreshToken,
  hashPassword,
} from '../modules/auth/src/tokenUtils'
import * as Excel from 'exceljs'
import Users from '../modules/auth/models/users'
import { initDB } from './mongoose'
import { sendBlockchain } from './blockchain'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const uploadInfo = async (): Promise<void> => {
  console.log(process.env.MONGO_URI)
  await initDB()
  const workbook = new Excel.Workbook()
  await workbook.xlsx.readFile('./src/data/datos.xlsx')
  const usersE = workbook.worksheets[0]
  const users: {
    email: string
    name: string
    password: string
    role: string
    refreshToken: string
  }[] = []

  for (let i = 1; i < usersE.actualRowCount; i++) {
    const row: Excel.Row = usersE.getRow(i + 1)
    const email = row.getCell(1).text.trim()
    const name = row.getCell(2).text.trim()
    const password = row.getCell(3).text.trim()
    const role = row.getCell(4).text.trim()

    const refreshToken = await createRefreshToken()

    users.push({
      email,
      name,
      password: await hashPassword(password),
      role,
      refreshToken,
    })
  }

  await Users.insertMany(users)
  await sleep(1000)

  console.log('step 2')

  const hemocomponents: {
    id: string
    bloodType: string
    ips: string
    tests: []
    author: string
    transfusion: null
    lastUpdated: string
  }[] = []

  const hemocomponentsE = workbook.worksheets[1]
  for (let i = 1; i < hemocomponentsE.actualRowCount; i++) {
    const row: Excel.Row = hemocomponentsE.getRow(i + 1)
    const id = row.getCell(1).text.trim()
    const bloodType = row.getCell(2).text.trim()

    hemocomponents.push({
      id,
      bloodType,
      ips: process.env.ID_IPS!,
      tests: [],
      transfusion: null,
      author: 'El autor',
      lastUpdated: new Date().toISOString(),
    })
  }

  console.log('pre hemocomponents', hemocomponents)

  await sendBlockchain('Hemocomponents', 'set', hemocomponents)
  await sleep(1000)

  console.log('Step 3')

  const patients: {
    id: string
    name: string
    bloodType: string
    ips: string
    author: string
    transfusions: []
    lastUpdated: string
  }[] = []

  const patientsE = workbook.worksheets[2]
  for (let i = 1; i < patientsE.actualRowCount; i++) {
    const row: Excel.Row = patientsE.getRow(i + 1)
    const id = row.getCell(1).text.trim()
    const name = row.getCell(2).text.trim()
    const bloodType = row.getCell(3).text.trim()

    patients.push({
      id,
      name,
      bloodType,
      ips: process.env.ID_IPS!,
      transfusions: [],
      author: 'El autor',
      lastUpdated: new Date().toISOString(),
    })
  }

  console.log('pre pacientes', patients)

  await sendBlockchain('Patients', 'set', patients)
  await sleep(1000)

  console.log('Step 4')

  const tests: {
    id: string
    ips: string
    passed: boolean
    lastUpdated: string
  }[] = []

  const testsE = workbook.worksheets[3]
  for (let i = 1; i < testsE.actualRowCount; i++) {
    const row: Excel.Row = testsE.getRow(i + 1)
    const id = row.getCell(1).text.trim()
    const passed = row.getCell(2).text.trim() === 'true'

    tests.push({
      id,
      ips: process.env.ID_IPS!,
      passed,
      lastUpdated: new Date().toISOString(),
    })
  }

  console.log('pre tests', tests)

  await sendBlockchain('Hemocomponents', 'test', tests)
  await sleep(1000)

  console.log('Step 5')

  const transfusions: {
    author: string
    ips: string
    hemocomponentId: string
    patientId: string
    adverseReactions: []
    lastUpdated: string
  }[] = []

  const transfusionE = workbook.worksheets[4]
  for (let i = 1; i < transfusionE.actualRowCount; i++) {
    const row: Excel.Row = transfusionE.getRow(i + 1)
    const hemocomponentId = row.getCell(1).text.trim()
    const patientId = row.getCell(2).text.trim()

    transfusions.push({
      author: 'El autor',
      ips: process.env.ID_IPS!,
      hemocomponentId,
      patientId,
      adverseReactions: [],
      lastUpdated: new Date().toISOString(),
    })
  }

  console.log('pre transfusión', transfusions)

  await sendBlockchain('Transfusions', 'transfer', transfusions)
  await sleep(1000)

  console.log('Step 5')

  const adverseEvents: {
    author: string
    ips: string
    hemocomponentId: string
    patientId: string
    symptom: string
    lastUpdated: string
  }[] = []

  const adverseEventsE = workbook.worksheets[5]
  for (let i = 1; i < adverseEventsE.actualRowCount; i++) {
    const row: Excel.Row = adverseEventsE.getRow(i + 1)
    const hemocomponentId = row.getCell(1).text.trim()
    const patientId = row.getCell(2).text.trim()
    const symptom = row.getCell(3).text.trim()

    adverseEvents.push({
      author: 'El autor',
      ips: process.env.ID_IPS!,
      hemocomponentId,
      patientId,
      symptom,
      lastUpdated: new Date().toISOString(),
    })
  }

  console.log('pre evento adverso', adverseEvents)

  await sendBlockchain('Transfusions', 'adverse', adverseEvents)

  console.log('Finish')
}

uploadInfo()
