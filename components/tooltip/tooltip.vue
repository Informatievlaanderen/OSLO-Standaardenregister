<template>
  <!-- prevent button from reloading the webpage (e.preventDefault()) -->
  <vl-button
    icon="info-filled"
    class="tooltip"
    mod-icon
    mod-naked-action
    v-vl-tooltip="`${title}`"
    @click="(e: Event) => e.preventDefault()"
  />
</template>

<script setup lang="ts" name="tooltip">
import type { Tooltip } from '~/types/tooltip'
defineProps<Tooltip>()
</script>

<style lang="scss" src="./style.scss" />
