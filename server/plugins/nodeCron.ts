import cron from 'node-cron'
import { Queue } from 'bullmq'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineNitroPlugin((nitroApp) => {
  // queue generates the jobs to be processed
  const listsQueue = new Queue('processListStatus', { connection: {
    host: 'localhost',
    port: 6379
  } })
  cron.schedule('* * * * *', async () => {
    const todoLists = await prisma.todoList.findMany({
      include: {
        tasks: true
      }
    })

    // For each todo list enqueue a job
    todoLists.forEach((list) => {
      listsQueue.add(`list_${list.name}_${list.id}`, { tasks: list.tasks, listId: list.id, status: list.status })
    })
  })
})
