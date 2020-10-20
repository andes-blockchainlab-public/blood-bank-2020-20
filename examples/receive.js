const Kafka = require('node-rdkafka');

// Read from the librdtesting-01 topic... note that this creates a new stream on each call!
var stream = new Kafka.KafkaConsumer.createReadStream(
  {
    'group.id': 'kafka',
    'metadata.broker.list': '192.168.99.100:9092',
  },
  {},
  {
    topics: ['mytopic'],
  }
);

stream.on('data', function (message) {
  console.log('Got message');
  console.log(message.value.toString());
});
