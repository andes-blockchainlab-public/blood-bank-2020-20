import { receiveMessage } from '@/modules/hemocomponents/util/kafka'
import { sendBlockchain } from './blockchain'

receiveMessage('SAVED_HEMOCOMPONENT_DB', async (payload) => {
  sendBlockchain('http://localhost:4004', payload)
})

receiveMessage('SAVED_HEMOCOMPONENT_DC', async (payload) => {
  console.log(payload)
})
