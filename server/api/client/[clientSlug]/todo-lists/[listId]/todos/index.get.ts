export default defineEventHandler(async (event) => {
  const todoLists = await event.context.prisma.todo.findMany()

  return todoLists
})
