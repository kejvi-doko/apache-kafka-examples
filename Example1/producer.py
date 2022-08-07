from confluent_kafka import Producer
import random
import time
import signal

p = Producer({'bootstrap.servers': 'localhost:9092'})

running: bool = True


def handler(signum, frame):
    global running
    running = False
    p.flush()
    print('Closing Producer...')
    exit(0)


signal.signal(signal.SIGINT, handler)


def delivery_report(err, msg):
    """ Called once for each message produced to indicate delivery result.
        Triggered by poll() or flush(). """
    if err is not None:
        print('Message delivery failed: {}'.format(err))
    else:
        print('Message delivered to {} [{}]'.format(msg.topic(),
                                                    msg.partition()))


while running:
    random_message = f'Message {random.random()}'
    # Trigger any available delivery report callbacks from previous produce() calls
    p.poll(0)

    # Asynchronously produce a message, the delivery report callback
    # will be triggered from poll() above, or flush() below, when the message has
    # been successfully delivered or failed permanently.
    p.produce('mytopic', random_message.encode('utf-8'), callback=delivery_report)
    time.sleep(1)
