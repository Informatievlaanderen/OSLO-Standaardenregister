<template>
  <vl-search-filter mod-alt ref="filterRef">
    <template v-slot:items>
      <vl-search-filter-section
        v-if="props?.filters"
        v-for="(filter, i) in props?.filters"
      >
        <!-- Temp disabled due to build issues with tooltip. External library (tippy.js) is not being included in build. -->
        <!-- <tooltip v-if="filter?.tooltip" :title="filter?.tooltip" /> -->
        <vl-accordion>
          <template v-slot:title>
            <div>
              {{ filter?.title }}
            </div>
            <div v-if="filter?.modal" class="modal__button">
              <vl-button
                icon="info-filled"
                mod-icon
                mod-naked-action
                @click="(e: Event) => onModalClick(e, filter?.modal)"
              />
            </div>
          </template>
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
        </vl-accordion>
      </vl-search-filter-section>
    </template>
  </vl-search-filter>
</template>

<script setup lang="ts" name="custom-filter">
import { type FilterOption } from '~/types/custom-filter'
import type { Modal } from '~/types/custom-modal'

const emits = defineEmits(['updateFilter'])

const onModalClick = (e: Event, modal?: Modal) => {
  e.preventDefault()
  e.stopPropagation()
  document.dispatchEvent(
    new CustomEvent('modal-toggle', {
      detail: {
        modalId: 'modal-toggle-event',
        modal: {
          title: modal?.title || 'Meer info',
          content: modal?.content || 'Geen informatie beschikbaar',
        },
      },
    }),
  )
}

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
