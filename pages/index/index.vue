<template>
  <vl-region>
    <content-header
      title="OSLO"
      href="https://www.vlaanderen.be/digitaal-vlaanderen"
      subtitle="OSLO Standaardenregister"
    />
    <vl-layout>
      <vl-region>
        <vl-grid mod-v-center mod-center mod-stacked>
          <vl-column width="12" width-s="12"> </vl-column>
          <standards-table :standards="data?.standards" />
        </vl-grid>
      </vl-region>
    </vl-layout>
    <content-footer />
  </vl-region>
</template>

<script setup lang="ts">
import type { Index } from '~/types'
import type { Standard } from '~/types/standard'

const route = useRoute()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [content, standards] = await Promise.all([
    queryContent<Index>('/configuration').find(),
    queryContent<Standard>('/standaarden').where({ _extension: 'json' }).find(),
  ])
  return {
    content: content[0],
    standards: useFilter(standards, route?.query),
  }
})
</script>
