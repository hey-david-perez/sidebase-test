export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, 'listId')
  const body = await readBody(event)

  const todo = await event.context.prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
      dueTo: new Date(body.dueTo),
      todoListId: Number(listId)
    },
  })

  return todo
})
