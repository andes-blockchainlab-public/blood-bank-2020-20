import { receiveMessage } from '@/modules/hemocomponents/util/kafka'

receiveMessage('SAVED_HEMOCOMPONENT_DB', async (payload) => {
  console.log(payload)
})

receiveMessage('SAVED_HEMOCOMPONENT_DC', async (payload) => {
  console.log(payload)
})
