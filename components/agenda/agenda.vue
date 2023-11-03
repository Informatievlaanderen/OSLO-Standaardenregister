<template>
  <vl-grid> </vl-grid>
  <vl-grid mod-stacked>
    <vl-column width="12">
      <vl-pager mod-align="center">
        <vl-pager-bounds
          v-if="events?.length"
          :from="paginationIndex.toString()"
          :to="maxTo().toString()"
          :total="events?.length?.toString()"
          page-label="evenementen"
        />
        <vl-pager-item
          v-if="events?.length"
          a11yLabel="vorige"
          label="Vorige"
          type="previous"
          @click="setPreviousIndex"
        />
        <vl-pager-item
          v-if="events?.length"
          a11yLabel="volgende"
          type="next"
          label="Volgende"
          @click="setNextIndex"
        />
      </vl-pager>
    </vl-column>
    <template v-for="(item, key) in events" :key="key">
      <!-- pagination check to only render a certain amount of events -->
      <vl-column
        v-if="
          key < paginationIndex - 1 + eventsPerPage &&
          key >= paginationIndex - 1 &&
          item?.startDate &&
          item?.endDate
        "
      >
        <vl-agenda-item
          :title="item.title"
          :date="{
            datetime: item.startDate,
            day: new Date(item.startDate).getDate(),
            month: new Date(item.startDate).toLocaleString('nl-BE', {
              month: 'short',
            }),
          }"
          :title-href="item.registrationLink"
          :note="'Locatie: ' + item.location"
        >
          <p>
            <b>
              Op {{ new Date(item.startDate).toLocaleDateString('nl-BE') }}
              van
              {{
                new Date(item.startDate).toLocaleTimeString('nl-BE', {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}
              tot
              {{
                new Date(item.endDate).toLocaleTimeString('nl-BE', {
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}</b
            >
          </p>
        </vl-agenda-item>
      </vl-column>
    </template>
  </vl-grid>
</template>

<script setup lang="ts" name="agenda">
import type { AgendaItem } from '~/types/agenda'
const paginationIndex = ref(1)
const eventsPerPage = 10
const props = defineProps({
  events: {
    type: Array<AgendaItem>,
  },
})

const setPreviousIndex = () => {
  const value = paginationIndex.value - eventsPerPage
  if (value > 0) {
    paginationIndex.value = value
  }
}

const setNextIndex = () => {
  if (props?.events?.length) {
    const value = paginationIndex.value + eventsPerPage
    if (value <= props?.events?.length) {
      paginationIndex.value = value
    }
  }
}

const maxTo = () => {
  if (props?.events?.length) {
    const value = paginationIndex.value + eventsPerPage - 1
    if (value > props.events.length) {
      return props.events.length
    } else {
      return value
    }
  }
  return 0
}
// reset the index when the list changes, so the first page is shown
watch(
  () => props.events,
  () => {
    paginationIndex.value = 1
  },
)
</script>
