import { activateHemocomponentsZMQListener } from '../modules/hemocomponents/src/zeromq'

export const activateZMQListeners = async (): Promise<void> => {
  activateHemocomponentsZMQListener()
}
