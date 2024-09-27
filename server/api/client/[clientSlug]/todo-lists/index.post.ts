const requestMiddleware = defineEventHandler((event) => {
  console.log(`Hello ${event.path}`)
})

const secondRequestMiddleware = defineEventHandler((event) => {
  console.log(`Second middleare ${event.path}`)
})

const responseMiddleware = defineEventHandler((event) => {
  console.log(`Goodbye ${event.path}`)
  setHeader(event, 'Set-Cookie', 'response=response cookie')
})

export default defineEventHandler({
  onRequest: [
    requestMiddleware,
    secondRequestMiddleware
  ],
  onBeforeResponse: [responseMiddleware],
  handler: async (event) => {
    const body = await readBody(event)
    const todoList = await event.context.prisma.todoList.create({
      data: {
        name: body.name
      },
    })

    return todoList
  }
})
