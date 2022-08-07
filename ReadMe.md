# Example 1
This is a simple example on how to create one producer and one consumer using apache kafka python api.

- Run the producer `python ./Example1/producer.py`
- Run the consumer `python ./Example1/consumer.py`

Messages from consumer: 

```text
(kafka-env) crs@192 apache-kafka-demo % python ./Example1/consumer.py
Received message: Message 0.20202180217982257
Received message: Message 0.8221140651072975
Received message: Message 0.4122096088874242
^CClosing Consumer...
```