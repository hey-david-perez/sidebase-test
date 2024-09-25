export default eventHandler((event) => {
  console.log('aaaa')
  if (!event.path.startsWith('/clients/')) {
    console.log('este no')
  }
  console.log('este si')
})
