export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, { body }) => {
    if (event.path.startsWith('/api')) {
      console.log('on response', event.path, { body })
      event.headers.append('Set-Cookie', 'response cookie')
    }
  })
})
