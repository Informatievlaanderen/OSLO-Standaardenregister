<template>
  <vl-region>
    <content-header
      title="OSLO"
      href="https://www.vlaanderen.be/digitaal-vlaanderen"
      subtitle="OSLO Standaardenregister"
    />
    <vl-layout>
      <vl-region>
        <vl-grid mod-v-center mod-center mod-stacked>
          <vl-column width="12" width-s="12">
            <vl-button icon="list" mod-icon-before @click="openSidebar"
              >Filter resultaten</vl-button
            >
          </vl-column>
          <standards-table :standards="data?.standards" />
        </vl-grid>
      </vl-region>
    </vl-layout>
    <content-footer />
    <sidebar ref="toggle">
      <template #header>
        <h5 class="filter__title">Filter standaarden</h5>
      </template>
      <template #content>
        <custom-filter :filters="filters" @updateFilter="updateFilter" />
      </template>
      <template #footer>
        <div class="filter__footer">
          <vl-button class="filter__footer__button" @click="openSidebar">{{
            `Toon resultaten (${data?.standards?.length})`
          }}</vl-button>
        </div>
      </template>
    </sidebar>
    <!-- Needs to be as low as possible to correctly show sidebar above all other elements in the DOM -->
  </vl-region>
</template>

<script setup lang="ts">
import { convertQueryParams } from '~/composables/useQueryParams'
import type { Index } from '~/types'
import type { Standard } from '~/types/standard'
import { FilterType, type FilterOption } from '~/types/custom-filter'

let selectedFilters = ref()

let filters: FilterOption[] = [
  {
    type: FilterType.CHECKBOX,
    title: 'Type toepassing',
    key: 'usageType',
    active: [false, false, false, false],
    options: [
      {
        default: true,
        label: 'Verplicht',
        key: 'Verplicht',
      },
      {
        default: false,
        label: 'Aanbevolen (vrijwillig)',
        key: 'Aanbevolen (vrijwillig)',
      },
      {
        default: false,
        label: 'TBD',
        key: 'TBD',
      },
      {
        default: false,
        label: 'Pas toe of leg uit',
        key: 'Pas toe of leg uit',
      },
    ],
  },
  {
    type: FilterType.RADIO,
    title: 'Type standaard',
    key: 'category',
    active: '',
    options: [
      {
        default: '1',
        key: 'Vocabularium',
        label: 'Vocabularium',
      },
      {
        default: '2',
        key: 'Applicatieprofiel',
        label: 'Applicatieprofiel',
      },
      {
        default: '3',
        key: 'Implementatiemodel',
        label: 'Implementatiemodel',
      },
      {
        default: '4',
        key: 'All',
        label: 'Toon alle standaarden',
      },
    ],
  },
]

const updateFilter = (activeFilters: Array<string[]>) => {
  selectedFilters.value = sanitizeFilters(filters, activeFilters)
}

const toggle = ref({
  // Bit of a hacky way to call the toggleSidebar function from the sidebar component
  toggleSidebar: () => {},
})

const openSidebar = () => {
  if (toggle?.value) {
    toggle.value.toggleSidebar()
  }
}

const route = useRoute()
// Save query params inside the filter object
const converted = convertQueryParams(route?.query, filters)
selectedFilters.value = converted.sanitized
filters = converted.filters
// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData(
  'data',
  async () => {
    const [content, standards] = await Promise.all([
      queryContent<Index>('/configuration').find(),
      queryContent<Standard>('/standaarden')
        .where({ _extension: 'json' })
        .find(),
    ])

    return {
      content: content[0],
      // standards: useQueryParams(standards, route?.query),
      standards: useFilter(standards, toRaw(selectedFilters?.value)),
    }
  },
  { watch: [selectedFilters] },
)
</script>

<style scoped lang="scss" src="./style.scss" />
