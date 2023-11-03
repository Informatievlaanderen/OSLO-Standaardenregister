<template>
  <div class="description-data__label">{{ title }}</div>
  <div class="description-data__value">
    <slot />
  </div>
</template>

<script setup lang="ts" name="descriptionData">
import type { DescriptionData } from '~/types/descriptionData'
defineProps<DescriptionData>()
</script>

<style scoped lang="scss" src="./style.scss" />
