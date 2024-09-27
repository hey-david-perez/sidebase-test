import { Queue, Worker } from 'bullmq'
import cron from 'node-cron'
import type { ListStatus } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// queue generates the jobs to be processed
// const listsQueue = new Queue('processListStatus', { connection: {
//   host: 'localhost',
//   port: 6379
// } })

const dummyQueue = new Queue('dummyQueue', { connection: {
  host: 'localhost',
  port: 6379
} })

// worker processes the jobs
const listsWorker = new Worker('processListStatus', async (job) => {
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
  // dummyQueue.add('from_job', { foo: 'dummy', bar: 'dummy' })
}, {
  connection: {
    host: 'localhost',
    port: 6379
  },
  // max 50 concurrent executions
  concurrency: 50
})

const dummyWorker = new Worker('dummyQueue', async (job) => {
  console.log(job.data.foo, job.data.bar)
}, {
  connection: {
    host: 'localhost',
    port: 6379
  }
})

// schedule job for each list every minute
// cron.schedule('* * * * *', async () => {
//   const todoLists = await prisma.todoList.findMany({
//     include: {
//       tasks: true
//     }
//   })

//   // For each todo list enqueue a job
//   todoLists.forEach((list) => {
//     listsQueue.add(`list_${list.name}_${list.id}`, { tasks: list.tasks, listId: list.id, status: list.status })
//   })
// })

listsWorker.on('active', (job) => {
  console.log(`${job.name} is being processed`)
})

listsWorker.on('completed', (job) => {
  console.log(`${job.name} has completed!`)
})

listsWorker.on('failed', (job, err) => {
  console.log(`${job.name} has failed with ${err.message}`)
})
