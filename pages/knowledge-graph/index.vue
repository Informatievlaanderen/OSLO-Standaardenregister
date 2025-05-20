<template>
  <content-header
    title="OSLO"
    href="/standaarden"
    :subtitle="`Knowledge Graph`"
  />
  <vl-layout>
    <vl-region>
      <vl-grid mod-v-center mod-center mod-stacked>
        <vl-column>
          <a href="/standaarden"
            ><vl-button type="button">{{ $t('backToOverview') }}</vl-button></a
          >
        </vl-column>
        <vl-column>
          <vl-title tag-name="h2" id="OSLO-Frontend"
            >OSLO Namespaces Graph</vl-title
          >
        </vl-column>
        <vl-column width="12">
          <namespaces-graph />
          <!-- <knowledge-graph /> -->
        </vl-column>
      </vl-grid>
    </vl-region>
  </vl-layout>
  <content-footer />
</template>

<script setup lang="ts">
import {
  VlLayout,
  VlRegion,
  VlGrid,
  VlColumn,
  VlTitle,
} from '@govflanders/vl-ui-design-system-vue3'
import ContentHeader from '~/components/content-header/content-header.vue'
import ContentFooter from '~/components/content-footer/content-footer.vue'
import KnowledgeGraph from '~/components/knowledge-graph/knowledge-graph.vue'
import NamespacesGraph from '~/components/namespaces-graph/namespaces-graph.vue'

import type { Index } from '~/types/index'

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [data] = await Promise.all([
    queryContent<Index>('/configuration').find(),
  ])
  return data[0]
})
</script>
