import { Kafka, EachMessagePayload } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'kafka',
  brokers: ['192.168.99.100:9092'],
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'kafka' })

export const initKafkaConnect = async () => {
  // Producing
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
}

export const sendMessage = async (value: string) => {
  await producer.send({
    topic: 'test-topic',
    messages: [{ value }],
  })
}

export const receiveMessage = async (
  value: (payload: EachMessagePayload) => Promise<void>
) => {
  await consumer.run({
    eachMessage: value,
  })
}
