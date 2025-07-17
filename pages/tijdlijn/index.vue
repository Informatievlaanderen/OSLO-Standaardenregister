<template>
  <content-header
    title="OSLO"
    href="/standaarden"
    :subtitle="`OSLO ${$t('standardsRegistry')}`"
  />
  <vl-region>
    <vl-layout>
      <vl-grid mod-v-center mod-center mod-stacked>
        <vl-column width="12" width-s="12">
          <navigation />
          <vl-title mod-no-space-bottom tag-name="h1">{{
            $t('timeline')
          }}</vl-title>
        </vl-column>
        <vl-column>
          <a href="/standaarden"
            ><vl-button type="button">{{ $t('backToOverview') }}</vl-button></a
          >
        </vl-column>
        <vl-column v-if="data?.standards">
          <history :standards="data?.standards" />
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import { BASEPATH } from '~/constants/constants'
import type { Standard } from '~/types/standard'
const { locale } = useI18n()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData(
  'data',
  // using find() instead of findOne() since findOne() caused issues when the file didn't exist
  async () => {
    const [standards] = await Promise.all([
      queryContent<Standard>(BASEPATH)
        .where({
          _extension: 'json',
          _path: { $regex: `^/standaarden/.*/${locale?.value}/configuration$` },
        })
        .find(),
    ])

    return {
      standards,
    }
  },
)

definePageMeta({
  middleware: ['i18n'],
})
</script>
