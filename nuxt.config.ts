// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
ssr: false,
  app: {
    baseURL: '/raul59209portfolio/', // Replace with your actual GitHub repo name
  },
  nitro: {
    preset: 'static'
  },
  modules: ['@nuxtjs/tailwindcss'],
    css: ['@/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
