<template>
  <p v-if="!!links?.length">
    &#124;
    <template v-for="link in links">
      <a :href="'#' + link?.href">{{ link?.title }}</a>
      &nbsp;&#124;
    </template>
  </p>
</template>

<script setup lang="ts" name="linksOverview">
import { OverviewLinks } from '~/types/linksOverview'
defineProps<OverviewLinks>()
</script>
