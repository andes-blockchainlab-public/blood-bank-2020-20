import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'kafka-admin',
  brokers: ['192.168.99.100:9092'],
})

const producer = kafka.producer()

export const initKafkaConnect = async (): Promise<void> => {
  // Producing
  await producer.connect()
}

export const sendMessage = async (value: string): Promise<void> => {
  await producer.send({
    topic: 'test-topic',
    messages: [{ value }],
  })
}
