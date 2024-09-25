import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  if (!prisma) {
    // prisma = new PrismaClient({
    //   log: [
    //     {
    //       emit: 'event',
    //       level: 'query',
    //     },
    //     {
    //       emit: 'stdout',
    //       level: 'error',
    //     },
    //     {
    //       emit: 'stdout',
    //       level: 'info',
    //     },
    //     {
    //       emit: 'stdout',
    //       level: 'warn',
    //     },
    //   ],
    // })
    prisma = new PrismaClient()
  }

  // prisma.$on('query', (e) => {
  //   console.log(`Query: ${e.query}`)
  //   console.log(`Params: ${e.params}`)
  //   console.log(`Duration: ${e.duration}ms`)
  // })
  event.context.prisma = prisma
})
