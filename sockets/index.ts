import { createServer } from 'node:http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.emit('hello', 'world')

  socket.on('howdy', (arg) => {
    socket.emit('hello', `hello ${arg}`)
  })
})

httpServer.listen(4040)
