import { SocketServer } from '../websocket'
import { createServer } from 'http'
import * as Koa from 'koa'

declare class InitWSServer {
  public start(port: number): Promise<void>
}

export class WSServer implements InitWSServer {
  private app = new Koa()
  public async start(port: number): Promise<void> {
    const server = createServer(this.app.callback())
    await SocketServer(server)
    server.listen(port, () => {
      console.log(`🚀 Server ready at ws://127.0.0.1:${port}`)
    })
  }
}
