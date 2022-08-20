## Example 1 (Single Messages)

Send single messages by the producer and consume them with a simple consumer

```shell
ts-node SendMessage/consumer.ts
ts-node SendMessage/producer.ts
```

## Example 2 (Multiple Batch Messages)

Send batch messages on different topics and consume them from multiple topics.

```shell
ts-node SendMessageInBatch/consumer.ts
ts-node SendMessageInBatch/producer.ts
```

## Example 3 (Transaction)

Send batch messages on different topics and consume them from multiple topics.

```shell
ts-node Transaction/consumer.ts
ts-node Transaction/producer.ts
```
