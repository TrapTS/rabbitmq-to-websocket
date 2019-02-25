import { ReceiveRabbitMQ } from '../types'
import { ConsumeMessage } from 'amqplib'
import { dddSocket } from '../websocket/server'

export const test: ReceiveRabbitMQ = {
  chananel: 'Hello',
  task: (message: ConsumeMessage | null) => {
    if (!message) throw new Error('message is null!!')
    console.log('[Message]: ', message.content.toString())

    dddSocket.emit('ddd', {
      message: message.content.toString()
    })
  }
}
