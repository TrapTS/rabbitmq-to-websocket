import { ReceiveRabbitMQ } from '../types'
import { ConsumeMessage } from 'amqplib'
import * as socketio from 'socket.io'

const io = socketio(3000)

export const test: ReceiveRabbitMQ = {
  chananel: 'Hello',
  task: (message: ConsumeMessage | null) => {
    if (!message) throw new Error('message is null!!')
    console.log('[Message]: ', message.content.toString())
    io.of('/hello').on('connect', socket => {
      console.log('[WebSocket]: User connected!!   ' + 'id: ' + socket.id)
      socket.emit('ddd', {
        message: message.content.toString()
      })
      socket.on('disconnect', () => {
        console.log('[WebSocket]: id: ' + socket.id + '   disconnected!!')
      })
    })
  }
}
