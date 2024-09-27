export default eventHandler({
  handler: (event) => {
    console.log('hello from auth middleware')
    if (!event.path.startsWith('/api/client/')) {
      return
    }
    if (!getHeader(event, 'Authorization')) {
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 403
      })
    }
  }
})
