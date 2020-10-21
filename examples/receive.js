const Kafka = require('node-rdkafka');

// Read from the librdtesting-01 topic... note that this creates a new stream on each call!
var stream = new Kafka.KafkaConsumer.createReadStream(
  {
    'group.id': 'kafka',
    'metadata.broker.list': process.env.DOCKER_HOST_IP + ':9092',
  },
  {},
  {
    topics: ['SAVED_HEMOCOMPONENT_DB'],
  }
);

stream.on('data', function (message) {
  console.log('Got message');
  console.log(message.value.toString());
});
