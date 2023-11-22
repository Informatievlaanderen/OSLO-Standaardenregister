<template>
  <vl-region>
    <content-header
      title="OSLO"
      href="https://www.vlaanderen.be/digitaal-vlaanderen"
      subtitle="OSLO Standaardenregister"
    />
    <vl-layout>
      <vl-region>
        <vl-grid>
          <vl-column width="10" width-s="12"> </vl-column>
        </vl-grid>
      </vl-region>
    </vl-layout>
    <content-footer />
  </vl-region>
</template>

<script setup lang="ts">
import type { Index } from '~/types'
const route = useRoute()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [content, standards] = await Promise.all([
    queryContent<Index>('/configuration').find(),
    queryContent<Index>('/standaarden').where({ _extension: 'json' }).find(),
  ])
  console.log(content[0])
  console.log(standards)
  console.log(standards)
  console.log(standards)
  return {
    content: content[0],
    standards: useFilter(standards[0], route?.query),
  }
})
</script>
