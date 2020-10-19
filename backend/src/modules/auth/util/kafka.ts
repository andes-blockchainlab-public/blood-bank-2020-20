import { Kafka, EachMessagePayload } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'kafka',
  brokers: ['192.168.99.100:9092'],
})

const producer = kafka.producer()

export const initKafkaConnect = async (): Promise<void> => {
  // Producing
  await producer.connect()
}

export const sendKafkaMessage = async (
  topic: string,
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  value: any
): Promise<void> => {
  await producer.send({
    topic,
    messages: [{ value }],
  })
}

export const receiveMessage = async (
  topic: string,
  value: (payload: EachMessagePayload) => Promise<void>
) => {
  const consumer = kafka.consumer({ groupId: 'kafka' })
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: value,
  })
}
