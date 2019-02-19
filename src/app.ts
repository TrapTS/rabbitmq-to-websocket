import 'reflect-metadata'
import * as dir from 'dir_filenames'
import { resolve } from 'path'
import { ReceiveRabbitMQ } from './types'
import { receive } from './rabbitmq/receive'
import * as socketio from 'socket.io'

const io = socketio(3000)

const bootstrap = () => {
  io.of('/console').on('connect', socket => {
    console.log('[WebSocket]: User connected!!   ' + 'id: ' + socket.id)
    socket.on('ddd', data => {
      console.log('[WebSocket]: ' + JSON.stringify(data))
    })
  })

  const files: string[] = dir(resolve(__dirname, './receiveClient'))

  files.map(file => {
    const receiveModule = require(file)
    for (let i in receiveModule) {
      const receiveRabbit: ReceiveRabbitMQ = receiveModule[i]
      receive(receiveRabbit)
    }
  })
}

bootstrap()
