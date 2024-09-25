import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.emit('connected', 'socket connected')
  socket.on('updateTodoStatus', (args) => {
    prisma.todoList.findUnique({
      where: {
        id: args.listId
      },
      include: {
        tasks: true
      }
    }).then((list) => {
      if (list.tasks.every(task => task.status === 'DONE')) {
        socket.emit('updateListStatus', { listId: args.listId, status: 'COMPLETED' })
        prisma.todoList.update({
          where: {
            id: args.listId,
          },
          data: {
            status: 'COMPLETED'
          }
        })
      }
      else if (list.tasks.some(task => new Date(task.dueTo) < new Date())) {
        socket.emit('updateListStatus', { listId: args.listId, status: 'LATE' })
        prisma.todoList.update({
          where: {
            id: args.listId,
          },
          data: {
            status: 'LATE'
          }
        })
      }
      else {
        socket.emit('updateListStatus', { listId: args.listId, status: 'ONTIME' })
        prisma.todoList.update({
          where: {
            id: args.listId,
          },
          data: {
            status: 'ONTIME'
          }
        })
      }
    })
  })
})

httpServer.listen(4040)
