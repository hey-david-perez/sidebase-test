import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  console.log(`Hello second route middleware ${event.path}`)
})
