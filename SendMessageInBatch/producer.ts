import { Kafka } from "kafkajs"
import {catchError, Observable} from "rxjs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const producer = kafka.producer()

const producerHandler = async ()=>{
  await producer.connect()
  await producer.sendBatch({
    topicMessages:[
      {
        topic: 'topic-a',
        messages: [{ key: 'key', value: 'hello topic-a' }],
      },
      {
        topic: 'topic-b',
        messages: [{ key: 'key', value: 'hello topic-b' }],
      },
      {
        topic: 'topic-c',
        messages: [
          {
            key: 'key',
            value: 'hello topic-c',
            headers: {
              'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
            },
          }
        ],
      }
    ]
  })

  await producer.disconnect();
}

producerHandler();
