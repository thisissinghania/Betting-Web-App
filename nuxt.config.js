export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  head: {
    title: 'pickatm-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0,user-scalable=0', },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', property: 'og:title', content: '' },
      { hid: 'og:url', property: 'og:url', content: '' },
      { hid: 'og:description', property: 'og:description', content: '' },
      { hid: 'og:image', property: 'og:image', content: '' },
    ],
    link: [
      //  { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css' },
      { rel: 'preconnect', href: 'https://dev.pickatm.com', crossorigin: 'true' },
      { rel: 'preconnect', href: 'https://www.adplugg.com' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2', as: 'font', type: 'font/woff2' },
      { rel: 'preconnect', href: 'https://www2.cbox.ws' },
    ],
  },

  // runtime config
  publicRuntimeConfig: {
    apiURL: process.env.BASE_URL,
    axios: {
      baseURL: process.env.BASE_URL,
      // browserBaseURL: process.env.BASE_URL
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/additional.css',
    // Load a Node.js module directly (here it's a Sass file)
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontstyle.js',
    '~/plugins/tooltip.js',
    '~/plugins/helper.js',
    { src: '~/plugins/ckeditorPlugin.js', mode: 'client' },
    { src: '~/plugins/modal.js', mode: 'client' },
    "~/plugins/axios"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "@/modules/axCache",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
    standalone: true
  },

  axios: {
    baseURL: process.env.BASE_URL,
    // browserBaseURL: process.env.BASE_URL
  },

  auth: {
    strategies: {
      local: {
        user: {
          property: 'data',
        },
        endpoints: {
          login: { url: 'login_check', method: 'post', propertyName: 'token' },
          user: { url: 'user/me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    },
    redirect: {
      login: "/login",
      logout: "/",
      home: false,
    },
    rewriteRedirects: false
  },
  generate: { fallback: true },
  router: {
    prefetchLinks: false,
    extendRoutes(routes, resolve) {
      routes.unshift({
        name: 'league-scores-with-league',
        path: '/scores',
        component: resolve(__dirname, 'pages/_league/scores/_type/index.vue'),
        chunkName: 'pages/_league/scores/_type/index'
      });
      routes.push({
        name: 'league-scores-with-type',
        path: '/:league/scores',
        component: resolve(__dirname, 'pages/_league/scores/_type/index.vue'),
        chunkName: 'pages/_league/scores/_type/index'
      });
      routes.unshift({
        name: 'computer-picks-old-with-type',
        path: '/computer-picks-old',
        component: resolve(__dirname, 'pages/_league/computer-picks-old/index.vue'),
        chunkName: 'pages/_league/computer-picks-old/index'
      });
      routes.unshift({
        name: 'computer-picks-with-type',
        path: '/computer-picks',
        component: resolve(__dirname, 'pages/_league/computer-picks/index.vue'),
        chunkName: 'pages/_league/computer-picks/index'
      });
      routes.unshift({
        name: 'player-props-index',
        path: '/player-props',
        component: resolve(__dirname, 'pages/_league/player-props/index.vue'),
        chunkName: 'pages/_league/player-props/index'
      });
      routes.unshift({
        name: 'player-props-index-detail',
        path: '/player-props-detail',
        component: resolve(__dirname, 'pages/_league/player-props/detail.vue'),
        chunkName: 'pages/_league/player-props/detail'
      });
      routes.unshift({
        name: 'consensus-picks-with-type',
        path: '/consensus-picks',
        component: resolve(__dirname, 'pages/_league/consensus-picks/index.vue'),
        chunkName: 'pages/_league/consensus-picks/index'
      });
      routes.push({
        name: 'league-picks-with-league',
        path: '/',
        component: resolve(__dirname, 'pages/_league/picks/_type/index.vue'),
        chunkName: 'pages/_league/picks/_type/index'
      });
      routes.push({
        name: 'league-picks-with-type',
        path: '/:league/picks',
        component: resolve(__dirname, 'pages/_league/picks/_type/index.vue'),
        chunkName: 'pages/_league/scores/_type/index'
      });
      routes.push({
        name: 'username-balance',
        path: '/:username/balance',
        component: resolve(__dirname, 'pages/balance.vue'),
        chunkName: 'pages/balance'
      });
      routes.push({
        name: 'username-balance-last-week',
        path: '/:username/balance-last-week',
        component: resolve(__dirname, 'pages/balance-last-week/index.vue'),
        chunkName: 'pages/balance-last-week/index'
      });
      routes.push({
        name: 'username-balance-pick-points',
        path: '/:username/balance-pick-points',
        component: resolve(__dirname, 'pages/balance-pick-points/index.vue'),
        chunkName: 'pages/balance-pick-points/index'
      });
      routes.push({
        name: 'username-my-pick-balance',
        path: '/:username/my-picks',
        component: resolve(__dirname, 'pages/my-picks/_id.vue'),
        chunkName: 'pages/my-picks/_id'
      });
      routes.push({
        name: 'username-my-pick-balance-type',
        path: '/:username/my-picks/:id',
        component: resolve(__dirname, 'pages/my-picks/_id.vue'),
        chunkName: 'pages/my-picks/_id'
      });
    },
  }
}
