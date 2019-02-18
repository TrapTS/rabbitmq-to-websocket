export interface ReceiveRabbitMQ {
  chananel: string
  task: (message: ConsumeMessage | null) => any
}

export enum TypeList {
  emit = 'EMIT',
  on = 'ON',
  raw = 'RAW'
}

export interface Socket {
  type: TypeList
  channel?: string
  logger?: boolean
  options: Function | Object
}
