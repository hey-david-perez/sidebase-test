import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  console.log(`Hello special ${event.path}`)
})
