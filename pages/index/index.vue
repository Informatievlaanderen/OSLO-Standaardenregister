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
            <vl-input-field
              mod-block
              id="input-field-1"
              name="input-field-1"
              placeholder="Zoeken op naam..."
              type="search"
              v-model="searchRef"
            />
          </vl-column>
          <vl-column width="12" width-s="12">
            <vl-action-group mod-collapse-s>
              <vl-button icon="list" mod-icon-before @click="openSidebar"
                >Filter resultaten</vl-button
              >
              <vl-button
                mod-link
                type="button"
                mod-icon-before
                icon="cross"
                @click="resetFilters"
                >Verwijder filters</vl-button
              >
            </vl-action-group>
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
import { type FilterOption } from '~/types/custom-filter'
import defaultFilters from './filter.config'

let selectedFilters = ref()
let searchRef = ref()
const toggle = ref({
  // Bit of a hacky way to call the toggleSidebar function from the sidebar component. Type the event
  toggleSidebar: () => {},
})

let filters: FilterOption[] = [...defaultFilters]

const updateFilter = (activeFilters: Array<string[]>) => {
  console.log(activeFilters)
  selectedFilters.value = sanitizeFilters(filters, activeFilters)
}

const openSidebar = () => {
  if (toggle?.value) {
    toggle.value.toggleSidebar()
  }
}

const resetFilters = () => {
  selectedFilters.value = {}
  searchRef.value = ''
  filters = defaultFilters
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
      standards: useSearch(
        useFilter(standards, toRaw(selectedFilters?.value)),
        searchRef?.value,
      ),
    }
  },
  { watch: [selectedFilters, searchRef] },
)
</script>

<style scoped lang="scss" src="./style.scss" />
