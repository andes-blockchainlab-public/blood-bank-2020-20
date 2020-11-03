import cbor from 'cbor'
import crypto from 'crypto'
import axios from 'axios'
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

const stream = new Stream('tcp://' + process.env.DOCKER_HOST_IP + ':4004')

const parseBlockCommit = async (blockId: string): Promise<string> => {
  console.log('llega blockId', blockId)
  const block = await axios.get(
    `http://${process.env.DOCKER_HOST_IP}:8008/blocks?id=${blockId}`
  )
  console.log('data del bloque', block.data)
  const batchId = block.data.data[0].batches[0].header_signature
  const batch = await axios.get(
    `http://${process.env.DOCKER_HOST_IP}:8008/batch_statuses?id=${batchId}`
  )
  console.log('llega batch', batch.data)
  if (batch.data.data[0].status !== 'COMMITTED') {
    throw new Error('La transacción no se aprobó')
  } else {
    console.log('win win')
  }
  return block.data.data[0].batches[0].transactions[0].payload
}

const checkServiceData = async (payload: string): Promise<void> => {
  console.log(payload)
  let buff = Buffer.from(payload, 'base64')
  const data = cbor.decodeFirstSync(buff)
  console.log(data)
  if (data.namespace === 'Hemocomponents') {
    console.log('its a me')
  }
}

const handleEvent = (msg): void => {
  // const mmm = EventList.decode(msg.content).events
  //console.log('events', 'llega evento', msg)
  if (msg.messageType === Message.MessageType.CLIENT_EVENTS) {
    const events = EventList.decode(msg.content).events
    console.log(events)
    events.forEach((e) => {
      //console.log('llega evento hemocomponentes', e.eventType)
      if (e.eventType == 'myevent') {
        console.log(e)
        console.log('data:', Buffer.from(e.data, 'utf8').toString('utf8'))
      }
      if (e.eventType == 'sawtooth/block-commit') {
        const attributes = e.attributes
        let blockId
        for (const attribute of attributes) {
          if (attribute.key === 'block_id') {
            blockId = attribute.value
          }
        }
        if (!blockId) {
          console.log('No se encuentra el id del bloque')
        }
        parseBlockCommit(blockId)
          .then(checkServiceData)
          .catch((e) => console.log(e))
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
        lastKnownBlockIds: [],
        subscriptions: [blockSub, deltaSub, mySub],
      }).finish()
    )
    .then((response) => ClientEventsSubscribeResponse.decode(response))
    .then((decoded) => {
      const status = Object.keys(ClientEventsSubscribeResponse.Status).find(
        (key) => ClientEventsSubscribeResponse.Status[key] === decoded.status
      )
      if (status !== 'OK') {
        throw new Error(`Validator responded with status "${status}"`)
      }
    })
}

export const activateHemocomponentsBCEventistener = async (): Promise<void> => {
  stream.connect(() => {
    stream.onReceive(handleEvent)
    subscribe()
    console.log('Connected')
  })
}
