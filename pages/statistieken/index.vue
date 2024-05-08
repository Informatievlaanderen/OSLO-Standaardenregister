<template>
  <content-header
    title="OSLO"
    href="/standaarden"
    subtitle="OSLO Standaardenregister"
  />
  <vl-region>
    <vl-layout>
      <vl-grid mod-v-center mod-center mod-stacked>
        <vl-column>
          <vl-title tag-name="h1">Statistieken</vl-title>
          <vl-introduction>
            Op deze pagina vind je allerlei statistieken terug van de
            OSLO-standaarden. Deze statistieken zijn louter een indicatie op
            basis van de data die we ter beschikking hebben.
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
</script>
