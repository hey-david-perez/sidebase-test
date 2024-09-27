import cron from 'node-cron'
import { Queue, Worker } from 'bullmq'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineNitroPlugin((nitroApp) => {
  // queue generates the jobs to be processed
  const listsQueue = new Queue('processListStatus', { connection: {
    host: 'localhost',
    port: 6379
  } })

  const dummyQueue = new Queue('dummyQueue', { connection: {
    host: 'localhost',
    port: 6379
  } })

  const dummyWorker = new Worker('dummyQueue', async (job) => {
    console.log(job.data)
  }, {
    connection: {
      host: 'localhost',
      port: 6379
    }
  })
  cron.schedule('* * * * *', async () => {
    const todoLists = await prisma.todoList.findMany({
      include: {
        tasks: true
      }
    })

    dummyQueue.add('from_job', { foo: 'dummy', bar: 'dummy' })

    // For each todo list enqueue a job
    todoLists.forEach((list) => {
      listsQueue.add(`list_${list.name}_${list.id}`, { tasks: list.tasks, listId: list.id, status: list.status })
    })
  })
})
