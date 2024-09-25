export default defineEventHandler(async (event) => {
  const todoLists = await event.context.prisma.todoList.findMany({
    include: {
      tasks: true
    }
  })

  return todoLists
})
