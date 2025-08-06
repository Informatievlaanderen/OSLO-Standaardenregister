<template>
  <content-header
    title="OSLO"
    href="/standaarden"
    :subtitle="$t('knowledgeGraph.organizationGraph')"
  />
  <vl-region>
    <vl-layout>
      <vl-grid mod-v-center mod-center mod-stacked>
        <vl-column>
          <navigation />
          <vl-title mod-no-space-bottom tag-name="h1">{{
            $t('knowledgeGraph.organizationGraph')
          }}</vl-title>
        </vl-column>
        <vl-column>
          <a href="/standaarden"
            ><vl-button type="button">{{ $t('backToOverview') }}</vl-button></a
          >
        </vl-column>
        <vl-column width="12">
          <organization-graph />
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
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
import OrganizationGraph from '~/components/organization-graph/organization-graph.vue'

import type { Index } from '~/types/index'

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [data] = await Promise.all([
    queryContent<Index>('/configuration').find(),
  ])
  return data[0]
})
</script>
