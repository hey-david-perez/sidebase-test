export default defineTask({
    meta: {
        name: "demo:nitrotask",
        description: "Run fake database migrations",
    },
    run({ payload, context }) {
        console.log("Running DB migration task...", payload);
        return { result: "Success" };
    },
})