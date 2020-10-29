import cbor from 'cbor'
import { receiveMessage } from '../../../util/kafka'
import { sendBlockchain } from './blockchain'
import { updateObjectBlockchainStatus } from './queries'

export const activatePatientListeners = (): void => {
  receiveMessage('RegistrarPacienteBD', async (payload) => {
    console.log('payload1', payload?.message?.value)
    if (payload.message.value) {
      console.log(cbor.decodeFirstSync(payload.message?.value))
      await sendBlockchain('set', cbor.decodeFirstSync(payload.message.value))
    }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  receiveMessage('RegistrarPacienteBC', async (payload) => {
    console.log('payload2', payload?.message?.value)
    if (payload.message.value) {
      const obj = cbor.decodeFirstSync(payload.message?.value)
      await updateObjectBlockchainStatus(obj, true)
    }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))
}
