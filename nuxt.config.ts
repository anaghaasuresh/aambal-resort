// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },


  modules: ['@nuxt/fonts'],

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/base.css',
  ],

  fonts: {
    families: [
      { name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Jost', provider: 'google', weights: [300, 400, 500, 600] },
    ],
  },

  app: {
    head: {
      title: 'Aambal Resort & Events',
    },
  },
})
