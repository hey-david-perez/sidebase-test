import { defineNuxtModule } from '@nuxt/kit'
export default defineNuxtModule({
  setup (options, nuxt) {
    nuxt.hook('ready', async () => {
        console.log('Nuxt is ready')
    })
  }
})