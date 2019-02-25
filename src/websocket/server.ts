import * as socketio from 'socket.io'

const io: socketio.Server = socketio(3000)
let dddSocket: socketio.Socket
io.of('/hello').on('connect', socket => {
  console.log('[WebSocket]: User connected!!   ' + 'id: ' + socket.id)
  dddSocket = socket
  socket.on('disconnect', () => {
    console.log('[WebSocket]: id: ' + socket.id + '   disconnected!!')
  })
})

export { dddSocket }
