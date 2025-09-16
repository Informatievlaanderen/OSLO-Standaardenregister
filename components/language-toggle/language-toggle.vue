
<script setup lang="ts">

import { useI18n } from 'vue-i18n';
import { useCookie } from '#app';

const { locale } = useI18n();

const languages = [
  { label: 'Nederlands', code: 'nl' },
  { label: 'English', code: 'en' }
];

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0];
});

function switchLanguage(lang: { label: string; code: string }) {
  locale.value = lang.code;
  
  const cookie = useCookie('i18n_redirected');
  cookie.value = lang.code;
}
</script>

<template>
  <vl-dropdown-navigation :label="currentLanguage.label" titleSize="h5">
    <vl-link-list>
      <vl-link-list-item v-for="lang in languages" :key="lang.code">
        <vl-link
          href="#"
          mod-block
          @click.prevent="switchLanguage(lang)"
        >
          {{ lang.label }}
        </vl-link>
      </vl-link-list-item>
    </vl-link-list>
  </vl-dropdown-navigation>
</template>



  
