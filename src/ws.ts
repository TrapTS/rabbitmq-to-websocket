import * as io from 'socket.io-client'

const socket = io('ws://localhost:3000/hello')
socket.on('connect', () => {
  console.log('[WebSocket]: Socket connected!!!')
})

socket.on('ddd', data => {
  console.log('----->', JSON.stringify(data))
})
