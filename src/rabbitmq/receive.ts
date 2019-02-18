import {
  connect,
  Channel,
  Connection,
  Options,
  ConsumeMessage,
  Message
} from 'amqplib'
import { ReceiveRabbitMQ } from '../types'

const url: string | Options.Connect =
  'amqp://rabbitmq:rabbitmq@118.24.62.50:5672'

type ReceiveMessageFunc = (receiveMessage: ReceiveRabbitMQ) => Promise<void>

export const receive: ReceiveMessageFunc = async (
  receiveMessage: ReceiveRabbitMQ
) => {
  const connection: Connection = await connect(url)
  console.info('[RabbitMQ]: Connect to RabbitMQ success!!!')
  try {
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(receiveMessage.chananel)
    await channel.consume(
      receiveMessage.chananel,
      async (message: ConsumeMessage | null) => {
        const operateFunc: Function = receiveMessage.task
        operateFunc(message)
        channel.ack(message as Message)
      }
    )
    connection.on(
      'error',
      async (err): Promise<void> => {
        console.error('[RabbitMQ]: ', err)
        await receive(receiveMessage)
      }
    )
    connection.on(
      'close',
      async (): Promise<void> => {
        console.error('[RabbitMQ]: ', 'RabbitQM connection closed!')
        await receive(receiveMessage)
      }
    )
  } catch (err) {
    console.error('[RabbitMQ]: ', err)
    await receive(receiveMessage)
  }
}
