import crypto from 'crypto'
import { Stream } from 'sawtooth-sdk/messaging/stream'
import {
  Message,
  EventList,
  EventSubscription,
  EventFilter,
  ClientEventsSubscribeRequest,
  ClientEventsSubscribeResponse,
} from 'sawtooth-sdk/protobuf'

const hash = (x, length = 64): string =>
  crypto.createHash('sha512').update(x).digest('hex').slice(0, length)

const INT_KEY_FAMILY = 'bloodbank'
const PREFIX = hash(INT_KEY_FAMILY, 6)

const NULL_BLOCK_ID = '0000000000000000'
const stream = new Stream('tcp://' + process.env.DOCKER_HOST_IP + ':4004')

const handleEvent = (msg): void => {
  // const mmm = EventList.decode(msg.content).events
  //console.log('events', 'llega evento', msg)
  if (msg.messageType === Message.MessageType.CLIENT_EVENTS) {
    const events = EventList.decode(msg.content).events
    console.log(events)
    events.forEach((e) => {
      console.log('llega evento pacientes', e.eventType)
      if (e.eventType == 'myevent') {
        console.log(e)
        console.log('data:', Buffer.from(e.data, 'utf8').toString('utf8'))
      }
      if (e.eventType == 'sawtooth/block-commit') {
        console.log(e)
        console.log('data:', Buffer.from(e.data, 'utf8').toString('utf8'))
      }
    })
    // deltas.handle(getBlock(events), getChanges(events))
  }
}

const subscribe = (): void => {
  const blockSub = EventSubscription.create({
    eventType: 'sawtooth/block-commit',
  })
  const deltaSub = EventSubscription.create({
    eventType: 'sawtooth/state-delta',
    filters: [
      EventFilter.create({
        key: 'address',
        matchString: `^${PREFIX}.*`,
        filterType: EventFilter.FilterType.REGEX_ANY,
      }),
    ],
  })

  const mySub = EventSubscription.create({
    eventType: 'myevent',
  })

  return stream
    .send(
      Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST,
      ClientEventsSubscribeRequest.encode({
        lastKnownBlockIds: [NULL_BLOCK_ID],
        subscriptions: [blockSub, deltaSub, mySub],
      }).finish()
    )
    .then((response) => ClientEventsSubscribeResponse.decode(response))
    .then((decoded) => {
      console.log('llega1', ClientEventsSubscribeResponse.Status)
      const status = Object.keys(ClientEventsSubscribeResponse.Status).find(
        (key) => ClientEventsSubscribeResponse.Status[key] === decoded.status
      )
      if (status !== 'OK') {
        throw new Error(`Validator responded with status "${status}"`)
      }
    })
}

export const activatePatientsBCEventistener = async (): Promise<void> => {
  stream.connect(() => {
    stream.onReceive(handleEvent)
    subscribe()
    console.log('Connected')
  })
}
