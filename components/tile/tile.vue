<template>
  <vl-doormat :title="title" :href="href" class="tile">
    {{ description }}
  </vl-doormat>
</template>

<script setup lang="ts" name="tile">
import type { NavigationLink } from '~/types/navigationLink'
defineProps<NavigationLink>()
</script>

<style lang="scss" src="./style.scss" />
