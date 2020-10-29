import { activatePatientsBCEventistener } from '../modules/patients/src/zeromq'
import { activateHemocomponentsBCEventistener } from '../modules/hemocomponents/src/zeromq'

export const activateBCEventListeners = async (): Promise<void> => {
  activateHemocomponentsBCEventistener()
  activatePatientsBCEventistener()
}
