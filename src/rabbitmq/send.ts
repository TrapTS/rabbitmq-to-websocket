import { connect, Channel, Connection, Options } from 'amqplib'

const url: string | Options.Connect =
  'amqp://rabbitmq:rabbitmq@118.24.62.50:5672'

type SendMessageFunc = (queue: string, message: string) => Promise<void>

export const send: SendMessageFunc = async (queue: string, message: string) => {
  const connection: Connection = await connect(url)
  const channel: Channel = await connection.createChannel()
  await channel.assertQueue(queue)
  const options: Options.Publish = {
    persistent: true
  }
  await channel.sendToQueue(queue, Buffer.from(message), options)
}
