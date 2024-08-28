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
          <vl-title mod-no-space-bottom tag-name="h1">{{
            $t('statistics')
          }}</vl-title>
        </vl-column>
        <vl-column>
          <a href="/standaarden"
            ><vl-button type="button">{{ $t('backToOverview') }}</vl-button></a
          >
        </vl-column>
        <vl-column width="12" width-s="12">
          <vl-introduction>
            {{ $t('content.statistics.introduction') }}
          </vl-introduction>
        </vl-column>
        <vl-column v-if="data?.statistics">
          <statistics :statistics="data?.statistics" />
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import type { Statistics } from '~/types/statistics'

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData(
  'data',
  // using find() instead of findOne() since findOne() caused issues when the file didn't exist
  async () => {
    const [statistics] = await Promise.all([
      queryContent<Statistics>('/statistics')
        .where({ _extension: 'json' })
        .find(),
    ])

    return {
      statistics: statistics[0],
    }
  },
)

definePageMeta({
  middleware: ['i18n'],
})
</script>
