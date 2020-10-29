import zmq from 'zeromq'
const sock = zmq.socket('sub')

export const activateHemocomponentsZMQListener = async (): Promise<void> => {
  sock.subscribe('sawtooth/block-commit')
  console.log('Subscriber connected to port 3000')

  sock.on('message', function (topic, message) {
    console.log(
      'received a message related to:',
      topic,
      'containing message:',
      message
    )
  })

  sock.bind('tcp://' + process.env.DOCKER_HOST_IP + ':4004')
}
