import { Kafka } from "kafkajs"
import {catchError, Observable} from "rxjs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const producer1 = kafka.producer()

const producerHandler = async (msg:string)=>{
  await producer1.connect()
  await producer1.send({
    topic: 'test-topic',
    messages: [
      { value: `Hello Msg: ${msg}` },
    ],
  })
}


const RETRY_INTERVAL=5000;
const MAX_TIMEOUT=25000;

const observable = new Observable(subscriber => {
  const intervalId = setInterval(async () => {
    subscriber.next(new Date().toString());
  },RETRY_INTERVAL);
  setTimeout(()=>{
    clearInterval(intervalId);
    subscriber.complete();
    subscriber.unsubscribe();
  },MAX_TIMEOUT);
  catchError((err, caught) => {throw new Error(err)});
})

observable.subscribe({
  async next(x) {
    console.log(`Sending message ${x}`);
    await producerHandler(x as string);
  },
  error(err) { console.error('Failed to get the list of running services: ' + err); },
  async complete() {
    console.log('Message Delivery Completed');
    await producer1.disconnect();
  }
});
