import { Kafka } from 'kafkajs';
import {catchError, Observable} from "rxjs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const consumerHandler = async ()=>{
  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()

  await consumer.subscribe({ topics: ['topic-a'] })

// You can subscribe to multiple topics at once
  await consumer.subscribe({ topics: ['topic-b', 'topic-c'] })

// It's possible to start from the beginning of the topic
  await consumer.subscribe({ topics: ['topic-d'], fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Topic Info:',topic);
      console.log('Message:',{
        value: message.value.toString(),
      })
    },
  })
}

consumerHandler()


