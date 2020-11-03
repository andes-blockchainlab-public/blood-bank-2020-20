'use strict'
import mongoose from 'mongoose'
const uri = 'mongodb://root:example@192.168.99.100:27017/mydb?authSource=admin'
console.log(uri)
const initDBMongo = function (): void {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.set('useCreateIndex', true)
}
export let initDB
if (process.env.NODE_ENV !== 'verifier') {
  const dbConnections = [initDBMongo]

  initDB = function (): void {
    for (const initDBT of dbConnections) {
      initDBT()
    }
  }
}
