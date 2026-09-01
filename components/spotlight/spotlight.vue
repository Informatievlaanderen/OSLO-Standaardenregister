<template>
  <article class="spotlight">
    <h1 class="spotlight__title" v-if="title">{{ title }}</h1>
    <h2 class="spotlight__subtitle" v-if="subtitle">{{ subtitle }}</h2>
    <div class="spotlight__data" v-if="links?.length">
      <div
        class="spotlight__data__value"
        v-for="link in links"
        :key="link.resourceReference"
      >
        <a
          v-if="link?.resourceReference && link?.name"
          :href="localizedHref(link.resourceReference)"
        >
          {{ link?.name }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts" name="spotlight">
import { getLocalizedHref } from '~/utils/helper.utils'
import type { Spotlight } from '~/types/spotlight'

const { locale, defaultLocale } = useI18n()

const props = withDefaults(defineProps<Spotlight>(), {
  localizeLinks: false,
})

const localizedHref = (href: string): string => {
  if (!props.localizeLinks) {
    return href
  }
  return getLocalizedHref(href, locale.value, defaultLocale)
}
</script>

<style lang="scss" src="./style.scss" />
