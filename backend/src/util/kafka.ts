import cbor from 'cbor'
import { Kafka, EachMessagePayload } from 'kafkajs'
import { activateHemocomponentsKafkaListeners } from '../modules/hemocomponents/src/kafkaListeners'
import { activateHospitalListeners } from '../modules/hospitals/src/kafkaListeners'

const kafka = new Kafka({
  clientId: 'Blood-Bank',
  brokers: [process.env.DOCKER_HOST_IP + ':9092'],
})

const producer = kafka.producer()

export const initKafkaConnect = async (): Promise<void> => {
  // Producing
  await producer.connect()
}

export const sendMessage = async (
  topic: string,
  payload: any
): Promise<void> => {
  if (payload._id) {
    payload._id = payload._id.toString()
  }
  const value = cbor.encode(JSON.parse(JSON.stringify(payload)))
  console.log('value to send', value)
  await producer.send({
    topic,
    messages: [{ value }],
  })
}

export const receiveMessage = async (
  topic: string,
  handler: (payload: EachMessagePayload) => Promise<void>
): Promise<void> => {
  const consumer = kafka.consumer({ groupId: topic })
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: handler,
  })
}

export const activateKafkaListeners = async (): Promise<void> => {
  activateHemocomponentsKafkaListeners()
  activateHospitalListeners()
}
