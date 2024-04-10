<!-- At the time of writing this component, there was a bug with the
vl-description-data component that made it so it did not take any width as
property. This made the component not usable in the grid system.
As a solution to it, I wrote a custom component that looks identical
https://develop--642e92e0cda6c627a0601f07.chromatic.com/?path=/docs/components-vl-description-data--docs -->

<template>
  <vl-grid mod-stacked-small>
    <vl-column width="3" width-m="6" width-s="12" v-for="item in props?.items">
      <div class="description-data__label">{{ item?.title }}</div>
      <div class="description-data__value" v-html="item?.element" />
    </vl-column>
  </vl-grid>
</template>

<script setup lang="ts" name="descriptionData">
import type { DescriptionData } from '~/types/descriptionData'
const props = defineProps({
  items: {
    type: Array<DescriptionData>,
  },
})
</script>

<style lang="scss" src="./style.scss" />
