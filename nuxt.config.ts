// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n',
    'nuxt-scheduler',
  ],
  nitro: {
    experimental: {
      tasks: true,
      websocket: true,
      openAPI: true,
    },
    scheduledTasks: {
      '* * * * 1': ['demo:nitrotask']
    },
  },
  i18n: {
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      {
        name: 'English',
        code: 'en',
        file: 'en.json'
      }
    ],
    experimental: {
      localeDetector: './localeDetector.ts'
    }
  },
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  typescript: {
    shim: false
  }
})
