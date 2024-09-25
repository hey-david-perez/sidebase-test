export default defineEventHandler(async (event) => {
  const todoId = getRouterParam(event, 'todoId')

  const deleteTodo = await event.context.prisma.todo.delete({
    where: {
      id: Number(todoId),
    },
  })

  return deleteTodo
})
