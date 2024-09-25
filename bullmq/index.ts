import { Queue, Worker } from 'bullmq'
import cron from 'node-cron'
import type { ListStatus } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// worker processes the jobs
const worker = new Worker('processListStatus', async (job) => {
  let status: ListStatus
  if (job.data.tasks.some(task => new Date(task.dueTo) < new Date()) && job.data.status !== 'COMPLETED') {
    status = 'LATE'
  }
  else {
    status = 'ONTIME'
  }
  const list = await prisma.todoList.update({
    where: {
      id: job.data.listId
    },
    data: {
      status
    }
  })
  console.log(list)
}, {
  connection: {
    host: 'localhost',
    port: 6379
  },
  // max 50 concurrent executions
  concurrency: 50
})

// queue generates the jobs to be processed
const myQueue = new Queue('processListStatus', { connection: {
  host: 'localhost',
  port: 6379
} })

// schedule job for each list every minute
cron.schedule('* * * * *', async () => {
  const todoLists = await prisma.todoList.findMany({
    include: {
      tasks: true
    }
  })

  // For each todo list enqueue a job
  todoLists.forEach((list) => {
    myQueue.add(`list_${list.name}_${list.id}`, { tasks: list.tasks, listId: list.id, status: list.status })
  })
})

worker.on('active', (job) => {
  console.log(`${job.name} is being processed`)
})

worker.on('completed', (job) => {
  console.log(`${job.name} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`${job.name} has failed with ${err.message}`)
})
