import { defineNuxtPlugin } from "nuxt/app";

export default defineNitroPlugin((nitro) => {
    nitro.hooks.hook('serve')
})