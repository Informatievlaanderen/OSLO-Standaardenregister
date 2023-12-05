<template>
  <vl-data-table class="standards-table">
    <thead>
      <tr>
        <th>Titel</th>
        <th>Categorie</th>
        <th>Status</th>
        <th>Verantwoordelijke organisatie</th>
        <th>Type toepassing</th>
        <th>Publicatiedatum</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="standards?.length" v-for="standard in pagedDatasets()">
        <td>
          <a :href="standard?.href">{{ standard?.title }}</a>
        </td>
        <td>
          <p>{{ standard?.category ?? Usage.TBD }}</p>
        </td>
        <td>
          <p>{{ standard?.state ?? Usage.TBD }}</p>
        </td>
        <td>
          <a :href="standard?.organisation?.href">{{
            standard?.organisation?.title
          }}</a>
        </td>
        <td>
          {{ standard?.usageType ?? Usage.TBD }}
        </td>
        <td>
          <p>{{ standard?.datePublished ?? Usage.TBD }}</p>
        </td>
      </tr>
      <tr v-else>
        <td colspan="5" class="vl-u-align-center">Geen data gevonden</td>
      </tr>
    </tbody>
  </vl-data-table>
  <vl-pager mod-align="center">
    <vl-pager-bounds
      v-if="standards?.length"
      :from="paginationIndex.toString()"
      :to="maxTo().toString()"
      :total="standards?.length?.toString()"
      page-label="evenementen"
    />
    <vl-pager-item
      v-if="standards?.length"
      a11yLabel="vorige"
      label="Vorige"
      type="previous"
      @click="setPreviousIndex"
    />
    <vl-pager-item
      v-if="standards?.length"
      a11yLabel="volgende"
      type="next"
      label="Volgende"
      @click="setNextIndex"
    />
  </vl-pager>
</template>

<script setup lang="ts" name="standardsTable">
import { Usage, type Standard } from '~/types/standard'
const paginationIndex = ref(1)
const itemsPerPage = 20
const props = defineProps({
  standards: {
    type: Array<Standard>,
  },
})

const setPreviousIndex = () => {
  const value = paginationIndex.value - itemsPerPage
  if (value > 0) {
    paginationIndex.value = value
  }
}

const setNextIndex = () => {
  if (props?.standards?.length) {
    const value = paginationIndex.value + itemsPerPage
    if (value <= props.standards?.length) {
      paginationIndex.value = value
    }
  }
}

const maxTo = () => {
  if (props?.standards?.length) {
    const value = paginationIndex.value + itemsPerPage - 1
    if (value > props?.standards?.length) {
      return props?.standards?.length
    } else {
      return value
    }
  }
  return 0
}

const pagedDatasets = (): Standard[] => {
  return (
    props?.standards?.slice(
      paginationIndex.value - 1,
      paginationIndex.value + itemsPerPage - 1,
    ) ?? []
  )
}

// reset the index when the list changes, so the first page is shown
watch(
  () => props?.standards,
  () => {
    paginationIndex.value = 1
  },
)
</script>

<style scoped lang="scss" src="./style.scss" />
