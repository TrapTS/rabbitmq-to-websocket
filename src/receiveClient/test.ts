import { ReceiveRabbitMQ } from '../types'
import { ConsumeMessage } from 'amqplib'
import * as io from 'socket.io-client'

const socket = io('ws://localhost:3000')
socket.on('connect', () => {
  console.log('[WebSocket]: Socket connected!!!')
})

export const test: ReceiveRabbitMQ = {
  chananel: 'Hello',
  task: (message: ConsumeMessage | null) => {
    if (!message) throw new Error('message is null!!')
    console.log('Message: ', message.content.toString())
  }
}
