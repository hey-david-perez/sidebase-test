export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const todoList = await event.context.prisma.todoList.create({
    data: {
      name: body.name
    },
  })

  return todoList
})
