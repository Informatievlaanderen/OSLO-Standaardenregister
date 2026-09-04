import fs from 'fs'
import path from 'path'
import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'

// Function to generate locales array
const generateLocales = () => {
  const localesDir = path.resolve(__dirname, 'locales')
  const files = fs.readdirSync(localesDir)

  return files.map((file: string) => {
    const code = path.basename(file, '.json')
    return {
      code,
      name: code.toUpperCase(),
      file,
    }
  })
}

// Build-time extraction of unique organisations from content files
const extractOrganisations = () => {
  const contentDir = path.resolve(__dirname, 'content/standaarden')
  const outputFile = path.resolve(__dirname, 'config/organisations.json')
  const orgMap = new Map<string, { name: string; uri: string }>()

  const walkDir = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath)
      } else if (
        entry.isFile() &&
        entry.name === 'configuration.json' &&
        fullPath.includes('/nl/')
      ) {
        try {
          const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
          const responsible = data.responsibleOrganisation
          if (Array.isArray(responsible)) {
            responsible.forEach((org: { name?: string; resourceReference?: string }) => {
              if (org.name && org.resourceReference) {
                // Normalize to canonical https://data.vlaanderen.be/id/organisatie/ form
                const match = org.resourceReference.match(/https?:\/\/data\.vlaanderen\.be\/(id|doc)\/organisatie\/(\S+)/)
                const code = match ? match[2] : org.resourceReference
                const canonicalUri = `https://data.vlaanderen.be/id/organisatie/${code}`
                if (!orgMap.has(canonicalUri)) {
                  orgMap.set(canonicalUri, { name: org.name, uri: canonicalUri })
                }
              }
            })
          }
        } catch {
          // skip invalid files
        }
      }
    }
  }

  walkDir(contentDir)
  const organisations = Array.from(orgMap.values())
    .sort((a, b) => a.name.localeCompare(b.name))
  fs.writeFileSync(outputFile, JSON.stringify(organisations, null, 2))
}

extractOrganisations()

export default defineNuxtConfig({
  runtimeConfig: {
    // private runtime env variables. Think of api keys: https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables
    // This is needed to pass the .env variables to the build process
    ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
    VITE_NAMESPACES_STATISTICS_URL: import.meta.env
      .VITE_NAMESPACES_STATISTICS_URL,
    // public runtime env variables
    // public: {}
  },

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
        {
          src: 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js',
        },
        {
          src: 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js',
        },
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
          href: 'https://ui.vlaanderen.be/2.latest/icons/app-icon/icon-highres-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://ui.vlaanderen.be/2.latest/icons/app-icon/touch-icon-iphone-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: 'https://ui.vlaanderen.be/2.latest/icons/app-icon/touch-icon-ipad-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: 'https://ui.vlaanderen.be/2.latest/icons/app-icon/touch-icon-iphone-retina-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: 'https://ui.vlaanderen.be/2.latest/icons/app-icon/touch-icon-ipad-retina-precomposed.png',
        },
      ],
    },
  },

  // Alias declaration for easier access to components directory
  alias: {
    '@components': fileURLToPath(new URL('./components', import.meta.url)),
    '@constants': fileURLToPath(new URL('./constants', import.meta.url)),
    '@content': fileURLToPath(new URL('./content', import.meta.url)),
    '@types': fileURLToPath(new URL('./types', import.meta.url)),
    '@config': fileURLToPath(new URL('./config', import.meta.url)),
  },

  // Global CSS: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: ['~/css/styles.scss'],

  build: {
    transpile: ['@govflanders/vl-widget-polyfill'],
  },

  // Plugins to run before rendering page: https://nuxt.com/docs/api/configuration/nuxt-config#plugins-1
  plugins: [{ src: '~/plugins/webcomponents.js', mode: 'client' }],

  // Modules: https://nuxt.com/docs/api/configuration/nuxt-config#modules-1
  modules: [
    // https://content.nuxtjs.org/
    '@nuxt/content',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
  ],

  nitro: {
    prerender: {
      routes: ['/404.html'],
    },
  },

  hooks: {
    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    },
  },

  // i18n module configuration: https://i18n.nuxtjs.org/
  i18n: {
    //https://i18n.nuxtjs.org/docs/guide#strategies
    strategy: 'no_prefix',
    locales: generateLocales(),
    lazy: false,
    langDir: 'locales/',
    defaultLocale: 'nl',
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },

  compatibilityDate: '2024-08-22',
})
