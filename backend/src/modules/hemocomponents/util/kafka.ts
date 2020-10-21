import { Kafka, EachMessagePayload } from 'kafkajs'
import cbor from 'cbor'

const kafka = new Kafka({
  clientId: 'kafka',
  brokers: [process.env.DOCKER_HOST_IP + ':9092'],
})

const producer = kafka.producer()

export const initKafkaConnect = async (): Promise<void> => {
  // Producing
  await producer.connect()
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const sendKafkaMessage = async (
  topic: string,
  payload: any
): Promise<void> => {
  console.log('payload to send', payload)
  if (payload._id) {
    payload._id = payload._id.toString()
  }
  const value = cbor.encode(JSON.parse(JSON.stringify(payload)))
  console.log('value to send', value)
  console.log('topic', topic)
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
