import cbor from 'cbor'
import { receiveMessage } from '../../../util/kafka'
import { sendBlockchain } from './blockchain'
// import { updateObjectBlockchainStatus } from './queries'

export const activatePatientsKafkaListeners = (): void => {
  receiveMessage('SAVE_PATIENT', async (payload) => {
    console.log('payload1', payload?.message?.value)
    if (payload.message.value) {
      console.log(cbor.decodeFirstSync(payload.message?.value))
      await sendBlockchain('set', cbor.decodeFirstSync(payload.message.value))
    }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('SAVED_PATIENT_BC', async (payload) => {
    console.log('Logrado', payload?.message?.value)
    /* if (payload.message.value) {
      const obj = cbor.decodeFirstSync(payload.message?.value)
      await updateObjectBlockchainStatus(obj, true)
    }*/
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('UPDATE_PATIENT', async (payload) => {
    console.log('payload3', payload?.message?.value)
    if (payload.message.value) {
      console.log(cbor.decodeFirstSync(payload.message?.value))
      sendBlockchain('update', cbor.decodeFirstSync(payload.message.value))
    }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('UPDATED_PATIENT_BC', async (payload) => {
    console.log('payload4', payload?.message?.value)
    /* if (payload.message.value) {
      const obj = cbor.decodeFirstSync(payload.message?.value)
      await updateObjectBlockchainStatus(obj, true)
    }*/
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))
}
