<template>
  <standards-jsonld :standards="data?.standards" />
  <content-header title="OSLO" :subtitle="`OSLO ${$t('standardsRegistry')}`" />
  <vl-region>
    <vl-layout>
      <vl-grid mod-v-center mod-center mod-stacked>
        <vl-column width="12">
          <navigation />
          <vl-title mod-no-space-bottom tag-name="h1">{{
            $t('standards')
          }}</vl-title>
        </vl-column>
        <vl-column width="12">
          <vl-typography class="search__title">
            <p>{{ $t('searchStandard') }}</p>
          </vl-typography>
          <vl-input-field
            mod-block
            :placeholder="`${$t('searchByTitle')}...`"
            type="search"
            v-model="searchRef"
          />
        </vl-column>
        <vl-column width="12" width-s="12">
          <vl-action-group mod-collapse-s>
            <vl-button icon="list" mod-icon-before @click="openSidebar">{{
              $t('filterResults')
            }}</vl-button>
            <vl-button
              v-if="!!Object.keys(selectedFilters)?.length || !!searchRef"
              mod-link
              type="button"
              mod-icon-before
              icon="cross"
              @click="resetFilters"
              >{{ $t('removeFilters') }}</vl-button
            >
          </vl-action-group>
        </vl-column>
        <standards-table
          :standards="data?.standards"
          :setSorting="(val: any) => (sortingKey = val)"
        />
      </vl-grid>
    </vl-layout>
    <sidebar ref="toggle">
      <template #header>
        <h5 class="filter__title">{{ $t('filterStandards') }}</h5>
      </template>
      <template #content>
        <custom-filter
          :filters="filters"
          @updateFilter="updateFilter"
          :key="rerenderRef"
        />
      </template>
      <template #footer>
        <div class="filter__footer">
          <vl-button class="filter__footer__button" @click="openSidebar">{{
            `${$t('showResults')} (${data?.standards?.length})`
          }}</vl-button>
        </div>
      </template>
      <!-- Needs to be as low as possible to correctly show sidebar above all other elements in the DOM -->
    </sidebar>
    <custom-modal />
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import { convertQueryParams } from '~/composables/useQueryParams'
import type { Standard } from '~/types/standard'
import { type FilterOption, type SanitizedFilter } from '~/types/custom-filter'
import { getDefaultFilters } from '~/config/filter.config'
import type { Sorting } from '~/types/sorting'
import { BASEPATH } from '~/constants/constants'

const { t, locale } = useI18n()
const route = useRoute()

// force rerender of child component when filters change
let rerenderRef = ref<number>(0)
let selectedFilters = ref<SanitizedFilter>({})
let searchRef = ref<string>('')
let sortingKey = ref<Sorting>({
  key: 'publicationDate',
  value: 1,
})

const toggle = ref({
  // Bit of a hacky way to call the toggleSidebar function from the sidebar component. Type the event
  toggleSidebar: () => {},
})

const defaultFilters = getDefaultFilters(t)

let filters: FilterOption[] = structuredClone(defaultFilters)

const updateFilter = (activeFilters: Array<string[]>) => {
  selectedFilters.value = sanitizeFilters(filters, activeFilters)
}

const openSidebar = () => {
  if (toggle?.value) {
    toggle.value.toggleSidebar()
  }
}

const resetFilters = () => {
  searchRef.value = ''
  selectedFilters.value = {}
  // Using structuredClone instead of spread operator since spread operator only deep copies top level of an object and nothing nested
  filters = structuredClone(defaultFilters)
  rerenderRef.value += 1
}

// Save query params inside the filter object
const converted = convertQueryParams(route?.query, filters)
selectedFilters.value = converted.sanitized
filters = converted.filters
// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data, refresh } = await useAsyncData(
  'data',
  async () => {
    const [standards] = await Promise.all([
      queryContent<Standard>(BASEPATH)
        .where({
          _extension: 'json',
          // make sure the directory we're looking in is the same as the current locale
          _path: { $regex: `^/standaarden/.*/${locale?.value}/configuration$` },
        })
        .find(),
    ])

    return {
      standards: useSorting(
        useSearch(useFilter(standards, selectedFilters.value), searchRef.value),
        compareKey(sortingKey.value ?? { key: 'publicationDate', value: 1 }),
      ),
    }
  },
  { watch: [selectedFilters, searchRef, sortingKey] },
)

watch(locale, () => {
  // Force a refresh of the data when locale changes
  refresh()
})

definePageMeta({
  middleware: ['i18n'],
})
</script>

<style lang="scss" src="./style.scss" />
