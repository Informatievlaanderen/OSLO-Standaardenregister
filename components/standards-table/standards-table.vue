<template>
  <vl-data-table class="standards-table">
    <thead>
      <tr>
        <th>Titel</th>
        <th>Categorie</th>
        <th>Verantwoordelijke organisatie</th>
        <th>Type toepassing</th>
        <th>Publicatiedatum</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="standards?.length" v-for="standard in standards">
        <td>
          <a :href="standard?.href">{{ standard?.title }}</a>
        </td>
        <td>
          <p>{{ standard?.category ?? 'TBD' }}</p>
        </td>
        <td>
          <a :href="standard?.organisation?.href">{{
            standard?.organisation?.title
          }}</a>
        </td>
        <td>
          {{ standard?.usageType ?? 'TBD' }}
        </td>
        <td>
          <p>{{ standard?.datePublished ?? 'TBD' }}</p>
        </td>
      </tr>
      <tr v-else>
        <td colspan="5" class="vl-u-align-center">Geen data gevonden</td>
      </tr>
    </tbody>
  </vl-data-table>
</template>

<script setup lang="ts" name="standardsTable">
import type { Standard } from '~/types/standard'
defineProps({
  standards: {
    type: Array<Standard>,
  },
})
</script>

<style scoped lang="scss" src="./style.scss" />
