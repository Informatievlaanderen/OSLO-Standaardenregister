<template>
  <article class="spotlight">
    <h1 class="spotlight__title" v-if="title">{{ title }}</h1>
    <h2 class="spotlight__subtitle" v-if="subtitle">{{ subtitle }}</h2>
    <div class="spotlight__data" v-if="links?.length">
      <div class="spotlight__data__value" v-for="link in links">
        <a :href="link?.uri">{{ link?.name }}</a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts" name="spotlight">
import type { Spotlight } from '~/types/spotlight'
defineProps<Spotlight>()
</script>

<style lang="scss" src="./style.scss" />
