import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'
import path from 'path';
import fs from 'fs';

const getDirectories = (basePath: string, srcPath: string) => {
  const dirs = fs.readdirSync(`${basePath}/${srcPath}`).filter(file => fs.statSync(path.join(`${basePath}/${srcPath}`, file)).isDirectory())
  return dirs.map((dir) => `${srcPath}/${dir}`)
}

const base = path.join(__dirname, 'content');
const routes = getDirectories(base, '')

console.log(JSON.stringify(routes, null, 4))

export default defineNuxtConfig({
  // https://nuxt.com/docs/getting-started/deployment#static-hosting
  routeRules: {
    // serve root as ssr
    '/': { ssr: true, cors: true },
  },
  app: {
    baseURL: '/standaarden',
    head: {
      title: 'OSLO Standaardenregister',
      htmlAttrs: {
        lang: 'nl',
      },
      script: [
        { src: 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js', },
        { src: 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'icon',
          sizes: '192x192',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/icon-highres-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-iphone-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-ipad-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-iphone-retina-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-ipad-retina-precomposed.png',
        },
      ],
    },
  },
  // Alias declaration for easier access to components directory
  alias: {
    "@components": fileURLToPath(new URL('./components', import.meta.url)),
    "@constants": fileURLToPath(new URL('./constants', import.meta.url)),
    "@content": fileURLToPath(new URL('./content', import.meta.url)),
    "@types": fileURLToPath(new URL('./types', import.meta.url)),
    "@config": fileURLToPath(new URL('./config', import.meta.url)),
  },
  // Global CSS: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: ['~/css/styles.scss'],
  build: {
    transpile: ['@govflanders/vl-widget-polyfill'],
  },
  // Plugins to run before rendering page: https://nuxt.com/docs/api/configuration/nuxt-config#plugins-1
  plugins: [
    { src: '~/plugins/webcomponents.js', mode: 'client' },
  ],
  // Modules: https://nuxt.com/docs/api/configuration/nuxt-config#modules-1
  modules: [
    // https://content.nuxtjs.org/
    '@nuxt/content',
  ],
  nitro: {
    prerender: {
      routes: [
        '/404.html',
        ...routes,
      ],
    }
  }
})