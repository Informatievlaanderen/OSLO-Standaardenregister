<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales,  } = useI18n()

function switchLanguage(lang: string) {
  locale.value = lang

  const cookie = useCookie('i18n_redirected')
  cookie.value = lang
}
</script>

<template>
  <vl-dropdown-navigation
    :label="locale"
    tagName="nav"
    titleSize="h5"
    class="language-toggle"
  >
    <vl-link-list>
      <vl-link-list-item v-for="lang in availableLocales" :key="lang">
        <vl-link href="#" mod-block @click.prevent="switchLanguage(lang)">
          {{ lang }}
        </vl-link>
      </vl-link-list-item>
    </vl-link-list>
  </vl-dropdown-navigation>
</template>

<script setup lang="ts" />

<style scoped lang="scss" src="./style.scss" />
