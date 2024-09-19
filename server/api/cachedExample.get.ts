/**
 * Fetch all `examples` from the database. Run `npx prisma db push` at least once for this to work.
 *
 * If you are using `tRPC` you can access the prisma-client by adding it to the context:
 * ```ts
 * export async function createContext(event: H3Event) {
 *   return { prisma: event.context.prisma }
 * }
 *
 * export type Context = inferAsyncReturnType<typeof createContext>
 * ```
 */
export default defineCachedEventHandler(event => {
    const elements =  event.context.prisma.agents.findMany({
        where: {
            Dimensions: {
                Agents: {
                    every: {
                        new_field: {
                            contains: 'test'
                        }
                    }
                }
            }
        }
    })
    return elements
}, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    swr: true,
    group: 'agents',
    staleMaxAge: 1000 * 60 * 60 * 24 * 7,
})
