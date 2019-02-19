export interface ReceiveRabbitMQ {
  chananel: string
  task: (message: ConsumeMessage | null) => any
}
