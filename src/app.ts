import 'reflect-metadata'
import * as dir from 'dir_filenames'
import { resolve } from 'path'
import { ReceiveRabbitMQ } from './types'
import { receive } from './rabbitmq/receive'

const bootstrap = () => {
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
