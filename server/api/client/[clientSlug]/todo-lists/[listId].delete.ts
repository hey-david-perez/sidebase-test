export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, 'listId')

  const deleteList = await event.context.prisma.todoList.delete({
    where: {
      id: Number(listId),
    },
  })

  return deleteList
})
