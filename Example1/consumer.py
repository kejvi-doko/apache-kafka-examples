from confluent_kafka import Consumer
import signal

c = Consumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'mygroup',
    'auto.offset.reset': 'earliest'
})

c.subscribe(['mytopic'])

running: bool = True


def handler(signum, frame):
    global running
    running = False
    c.close()
    print('Closing Consumer...')
    exit(0)


signal.signal(signal.SIGINT, handler)

while running:
    msg = c.poll(1.0)

    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        continue

    print('Received message: {}'.format(msg.value().decode('utf-8')))
