export default eventHandler(async (event) => {
    // IMPORTANT: Authenticate user and validate payload!
    const payload = { ...getQuery(event) }
    const { result } = await runTask("demo:nitrotask", { payload })
  
    return { result }
  })