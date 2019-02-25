import * as socketio from 'socket.io'

const io = socketio(3000)
let dddSocket
io.of('/hello').on('connect', socket => {
  console.log('[WebSocket]: User connected!!   ' + 'id: ' + socket.id)
  dddSocket = socket
  socket.on('disconnect', () => {
    console.log('[WebSocket]: id: ' + socket.id + '   disconnected!!')
  })
})

export { dddSocket }
