<template>
  <vl-data-table class="standards-table">
    <thead>
      <tr>
        <th>
          <vl-button
            class="sorting__button"
            mod-icon-after
            mod-naked-action
            :icon="sortingIcon('title')"
            :a11y-label="'Title'"
            @click="onPressSorting('title')"
          >
            Titel
          </vl-button>
        </th>
        <th>Detailpagina</th>
        <th>
          Categorie
          <vl-button
            class="modal__button"
            icon="info-filled"
            mod-icon
            mod-naked-action
            @click="
              (e: Event) =>
                onModalClick(e, {
                  title: 'Categorie standaard',
                  content: IMPLEMENTATION_MODEL_DESCRIPTION,
                })
            "
          />
        </th>
        <th>
          Status
          <vl-button
            class="modal__button"
            icon="info-filled"
            mod-icon
            mod-naked-action
            @click="
              (e: Event) =>
                onModalClick(e, {
                  title: 'Status standaard',
                  content: RECOGNIZED_DESCRIPTION,
                })
            "
          />
        </th>
        <th>Verantwoordelijke organisatie</th>
        <th>Type toepassing</th>
        <th>
          <vl-button
            class="sorting__button"
            mod-icon-after
            mod-naked-action
            :icon="sortingIcon('publicationDate')"
            :a11y-label="'publicationDate'"
            @click="onPressSorting('publicationDate')"
          >
            Publicatiedatum
          </vl-button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="standards?.length" v-for="standard in pagedDatasets()">
        <td>
          <a
            target="_blank"
            :href="standard?.specificationDocuments?.[0]?.resourceReference"
            >{{ standard?.title }}</a
          >
        </td>
        <td>
          <a :href="standard?._path?.replace('configuration', '')">
            <vl-icon mod-large icon="news"></vl-icon>
          </a>
        </td>
        <td>
          <p>
            {{ useCapitalizeFirstLetter(standard?.category ?? Usage.TBD) }}
          </p>
        </td>
        <td>
          <p>
            {{
              !!standard?.status
                ? useRemoveDashes(useCapitalizeFirstLetter(standard?.status))
                : Usage.TBD
            }}
          </p>
        </td>
        <td>
          <div
            v-for="(organisation, index) in standard?.responsibleOrganisation"
            :key="index"
          >
            <a :href="organisation?.resourceReference">{{
              organisation?.name
            }}</a>
          </div>
        </td>
        <td>
          {{ !!standard?.usage ? standard.usage : Usage.TBD }}
        </td>
        <td>
          <p>
            {{
              !!standard?.publicationDate ? standard.publicationDate : Usage.TBD
            }}
          </p>
        </td>
      </tr>
      <tr v-else>
        <td colspan="6" class="vl-u-align-center">Geen data gevonden</td>
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
import { type Modal } from '~/types/custom-modal'
import { SortingDirection } from '~/composables/useSorting'
import {
  IMPLEMENTATION_MODEL_DESCRIPTION,
  RECOGNIZED_DESCRIPTION,
  ITEMS_PER_PAGE,
} from '~/constants/constants'

const paginationIndex = ref(1)
const props = defineProps({
  standards: {
    type: Array<Standard>,
  },
  setSorting: {
    required: false,
    type: Function,
  },
})

const sortingDirection = ref<SortingDirection>(SortingDirection.ASC)
const sortingKey = ref<SortingKey>('publicationDate')

const sortingIcon = (key: SortingKey) =>
  key !== sortingKey.value
    ? 'expand-vertical'
    : sortingDirection.value === SortingDirection.ASC
      ? 'arrow-up'
      : 'arrow-down'

const onPressSorting = (key: SortingKey) => {
  if (sortingKey.value !== key) {
    sortingKey.value = key
    sortingDirection.value = SortingDirection.ASC
  } else {
    sortingDirection.value =
      sortingDirection.value === SortingDirection.ASC
        ? SortingDirection.DESC
        : SortingDirection.ASC
  }
  if (props.setSorting) {
    props.setSorting({ key, value: sortingDirection.value })
  }
}

const setPreviousIndex = () => {
  const value = paginationIndex.value - ITEMS_PER_PAGE
  if (value > 0) {
    paginationIndex.value = value
  }
}

const setNextIndex = () => {
  if (props?.standards?.length) {
    const value = paginationIndex.value + ITEMS_PER_PAGE
    if (value <= props?.standards?.length) {
      paginationIndex.value = value
    }
  }
}

const maxTo = () => {
  if (props?.standards?.length) {
    const value = paginationIndex.value + ITEMS_PER_PAGE - 1
    if (value > props.standards?.length) {
      return props.standards?.length
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
      paginationIndex.value + ITEMS_PER_PAGE - 1,
    ) ?? []
  )
}
//modal
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

// reset the index when the list changes, so the first page is shown
watch(
  () => props?.standards,
  () => {
    paginationIndex.value = 1
  },
)
</script>

<style lang="scss" src="./style.scss" />
