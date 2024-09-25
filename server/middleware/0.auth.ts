export default eventHandler((event) => {
  if (!event.path.startsWith('/api/client/')) {
    return
  }
  if (!getHeader(event, 'Authorization')) {
    throw createError({
      statusMessage: 'Unauthenticated',
      statusCode: 403
    })
  }
})
