<template>
  <vl-typography>
    <ContentRenderer :value="markdown">
      <ContentRendererMarkdown :value="markdown" />
    </ContentRenderer>
  </vl-typography>
</template>

<script setup lang="ts">
import type { Markdown } from '~/types/markdown'

defineProps<{
  markdown: Markdown
}>()
</script>
