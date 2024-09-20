import { Queue } from 'bullmq'

export default defineEventHandler(
  async (event) => {
    const body = await readBody(event)

    const myQueue = new Queue('foo', { connection: {
      host: 'localhost',
      port: 6379
    } })

    async function addJobs() {
      console.log('addjobs')
      await myQueue.add('myJobName', { foo: `foo ${body}` })
      await myQueue.add('myJobName', { qux: `baz ${body}` })
    }

    await addJobs()
  }
)
