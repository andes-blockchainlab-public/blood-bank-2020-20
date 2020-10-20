import { Kafka, EachMessagePayload } from 'kafkajs'

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
): Promise<void> => {
  const consumer = kafka.consumer({ groupId: 'kafka' })
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: value,
  })
}
