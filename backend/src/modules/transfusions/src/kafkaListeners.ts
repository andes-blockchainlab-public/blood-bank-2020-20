import cbor from 'cbor'
import { receiveMessage } from '../../../util/kafka'
import { sendBlockchain } from './blockchain'
// import { updateObjectBlockchainStatus } from './queries'

export const activateTransfusionsKafkaListeners = (): void => {
  receiveMessage('TRANSFER_HEMOCOMPONENT', async (payload) => {
    console.log('payload1', payload?.message?.value)
    if (payload.message.value) {
      console.log(cbor.decodeFirstSync(payload.message?.value))
      await sendBlockchain(
        'transfer',
        cbor.decodeFirstSync(payload.message.value)
      )
    }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('TRANSFER_HEMOCOMPONENT_BC', async (payload) => {
    console.log('Logrado', payload?.message?.value)
    /* if (payload.message.value) {
      const obj = cbor.decodeFirstSync(payload.message?.value)
      await updateObjectBlockchainStatus(obj, true)
    }*/
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('ADVERSE_REACTION_HEMOCOMPONENT', async (payload) => {
    console.log('payload1', payload?.message?.value)
    if (payload.message.value) {
      console.log(cbor.decodeFirstSync(payload.message?.value))
      await sendBlockchain(
        'adverse',
        cbor.decodeFirstSync(payload.message.value)
      )
    }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('ADVERSE_REACTION_HEMOCOMPONENT_BC', async (payload) => {
    console.log('Logrado', payload?.message?.value)
    /* if (payload.message.value) {
      const obj = cbor.decodeFirstSync(payload.message?.value)
      await updateObjectBlockchainStatus(obj, true)
    }*/
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))
}
