export default eventHandler({
  handler: (event) => {
    if (!event.path.startsWith('/api/client/')) {
      return
    }
    console.log(`hello from auth middleware ${event.path}`)

    if (!getHeader(event, 'Authorization')) {
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 403
      })
    }
  }
})
