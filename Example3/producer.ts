import { Kafka } from "kafkajs"
import {catchError, Observable} from "rxjs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer({
  transactionalId: 'my-transactional-producer',
  maxInFlightRequests: 1,
  idempotent: true
})
const topic = 'transaction-topic';

const producerHandler = async ()=>{
  await producer.connect();
  const transaction=await producer.transaction();

  try {
    await transaction.send({topic:topic,messages:[{key:'key', value:'TransactionMsg1'}]});
    await transaction.send({topic:topic,messages:[{key:'key', value:'TransactionMsg2'}]});
    await transaction.send({topic:topic,messages:[{key:'key', value:'TransactionMsg3'}]});
    await transaction.commit()
  } catch (e) {
    await transaction.abort()
  }

  const transaction2=await producer.transaction();

  try {
    await transaction2.send({topic:topic,messages:[{key:'key', value:'TransactionMsg4'}]});
    await transaction2.abort()
  } catch (e) {
    await transaction2.abort()
  }
  await producer.disconnect();
}

producerHandler();
