<template>
  <!-- The JSON-LD data is embedded within a script tag with type "application/ld+json" -->
</template>
<script setup lang="ts">
import { JSONLD } from '~/constants/constants'
import { buildJsonLd } from '~/services/standards-jsonld.service'
import { type Standard } from '~/types/standard'

const props = defineProps({
  standards: {
    type: Array<Standard>,
  },
})

// Prevent multiple re-computations of the JSON-LD string on render changes
const jsonLdString = computed(() => {
  if (!props.standards?.length) return ''
  return JSON.stringify(buildJsonLd(props.standards), null, 2)
})

useServerHead({
  script: [
    {
      id: 'standards-jsonld',
      type: JSONLD,
      innerHTML: jsonLdString,
      tagPosition: 'bodyOpen',
    },
  ],
})
</script>
