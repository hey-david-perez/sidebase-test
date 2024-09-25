export default defineEventHandler(async (event) => {
  const todoId = getRouterParam(event, 'todoId')
  const body = await readBody(event)

  const deleteTodo = await event.context.prisma.todo.update({
    where: {
      id: Number(todoId),
    },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      dueTo: new Date(body.dueTo)
    }
  })

  return deleteTodo
})
