<template>
  <vl-search-filter mod-alt ref="filterRef">
    <template v-slot:items>
      <vl-search-filter-section
        v-if="props?.filters"
        v-for="(filter, i) in props?.filters"
      >
        <vl-search-filter-section-title>
          {{ filter?.title }}
          <tooltip v-if="filter?.tooltip" :title="filter?.tooltip" />
        </vl-search-filter-section-title>
        <ul>
          <vl-search-filter-item
            tag-name="li"
            v-if="filter.options"
            v-for="(option, ii) in filter.options"
          >
            <vl-radio
              v-if="filter.type === 'radio'"
              :value="option.default"
              :id="`radio_${i}_${ii}`"
              v-model="data[i]"
            >
              {{ option?.label }}
            </vl-radio>
            <vl-checkbox
              v-if="filter.type === 'checkbox'"
              :value="option.default"
              :checked="data[i][ii]"
              :id="`checkbox_${i}_${ii}`"
              v-model="data[i][ii]"
            >
              {{ option?.label }}
            </vl-checkbox>
          </vl-search-filter-item>
        </ul>
      </vl-search-filter-section>
    </template>
  </vl-search-filter>
</template>

<script setup lang="ts" name="custom-filter">
import { type FilterOption } from '~/types/custom-filter'

const emits = defineEmits(['updateFilter'])

const props = defineProps({
  filters: {
    type: Array<FilterOption>,
    required: true,
  },
})

const keys: Array<any> = props.filters.map((filter: FilterOption) => {
  return filter?.active
})

let data = reactive(keys)

watch(
  [data],
  async () => {
    // Linked to function from parent component
    emits('updateFilter', data)
  },
  { deep: true },
)
</script>
