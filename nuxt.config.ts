// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n',
    'nuxt-scheduler',
    '@vueuse/nuxt'
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN
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
  },
  compatibilityDate: '2024-09-19',
  devtools: {
    enabled: false,
  },
  nitro: {
    handlers: [
      {
        route: '/api/client',
        handler: './server/routeMiddleware/helloMiddleware',
        middleware: true

      },
      {
        route: '/api/client',
        handler: './server/routeMiddleware/secondRouteMiddleware',
        middleware: true

      }
    ]
  }
})
