import type { H3Event } from 'h3'

export function defineMyHandler(handler: (event: H3Event) => any) {
  const _handler = async (event: H3Event) => {
    const response = await handler(event)

    // setResponseHeader(event, 'Set-Cookie', 'response=response cookie')

    return response
  }

  return defineEventHandler(_handler)
}
