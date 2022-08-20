import { Kafka } from 'kafkajs';
import {catchError, Observable} from "rxjs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const consumerHandler = async ()=>{
  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'transaction-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}

consumerHandler()


