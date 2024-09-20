import { streamObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'

const handler = defineLazyEventHandler(async () => {
  const apiKey = useRuntimeConfig().openaiApiKey
  if (!apiKey)
    throw new Error('Missing OpenAI API key')
  const openai = createOpenAI({
    apiKey,
  })

  return defineEventHandler(async (event: any) => {
    const { text } = await readBody(event)

    const result = await streamObject({
      model: openai('gpt-4o'),
      schema: z.object({
        features: z.array(z.string()),
        description: z.string(),
        price: z.number(),
        industry: z.array(z.string()),
        // mermaidChartString: z.string().describe('Simple linear path'),
      }),
      schemaName: 'ProductDescription',
      schemaDescription: 'Analyze a product description and extract its features, description and price',
      temperature: 0.2,

      messages: [
        { role: 'user', content: text },
      ],
    })

    return result.toTextStreamResponse()
  })
})

export type TestEndpoingData = Awaited<ReturnType<typeof handler>>
export default handler
