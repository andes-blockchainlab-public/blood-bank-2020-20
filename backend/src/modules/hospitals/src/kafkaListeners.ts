// import cbor from 'cbor'
import { receiveMessage } from '../../../util/kafka'
// import { sendBlockchain } from './blockchain'
// import { updateObjectBlockchainStatus } from './queries'

export const activateHospitalListeners = (): void => {
  receiveMessage('RegistrarHospitalBD', async (payload) => {
    console.log('payload1', payload?.message?.value)
    console.log('llego acá')
    // if (payload.message.value) {
    //   console.log(cbor.decodeFirstSync(payload.message?.value))
    //   await sendBlockchain('set', cbor.decodeFirstSync(payload.message.value))
    // }
  }).catch((e) => console.error(`[example/consumer] ${e.message}`, e))
}
