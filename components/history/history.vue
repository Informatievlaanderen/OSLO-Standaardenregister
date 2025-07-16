<template>
  <div class="history-timeline">
    <div v-if="timelineEvents.length > 0" class="timeline-container">
      <div class="timeline-line"></div>

      <template
        v-for="(event, index) in timelineEvents"
        :key="`${event.standard}-${event.type}-${index}`"
      >
        <div v-if="shouldShowYearDivider(index)" class="year-divider">
          <div class="year-label">{{ event.year }}</div>
        </div>

        <div
          class="timeline-event"
          :class="[
            `timeline-event--${event.type}`,
            { 'timeline-event--left': index % 2 === 0 },
          ]"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">{{ event.date }}</div>
            <div class="timeline-title">
              <a v-if="event.link" :href="event.link" target="_blank">{{
                event.standard
              }}</a>
              <span v-else>{{ event.standard }}</span>
            </div>
            <div class="timeline-type">{{ getEventTypeText(event.type) }}</div>
          </div>
        </div>
      </template>
    </div>

    <div v-else class="no-timeline-data">
      <p>{{ $t('noTimelineDataAvailable') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineEvent } from '~/types/history'
import { normalizeDate, isValidDate } from '~/utils/date.utils'
import type { Standard } from '~/types/standard'

const { t } = useI18n()
const props = defineProps<{ standards: Standard[] }>()

const eventTypes = [
  { field: 'dateOfRegistration', type: 'registration' },
  {
    field: 'dateOfAcknowledgementByWorkingGroup',
    type: 'workingGroupAcknowledgement',
  },
  { field: 'datePublicReviewStart', type: 'publicReviewStart' },
  {
    field: 'dateOfAcknowledgementBySteeringCommittee',
    type: 'acknowledgement',
  },
]

const timelineEvents = computed(() => {
  const events: TimelineEvent[] = []

  props.standards.forEach((standard) => {
    eventTypes.forEach(({ field, type }) => {
      if (isValidDate(standard[field])) {
        events.push({
          date: formatDate(normalizeDate(standard[field])),
          standard: standard.title,
          link: standard.specificationDocuments?.[0]?.resourceReference,
          type,
          organization: standard.responsibleOrganisation?.[0]?.name,
          year: new Date(standard[field]).getFullYear(),
        })
      }
    })
  })

  return events
    .filter((event) => isValidDate(event.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const shouldShowYearDivider = (index: number): boolean => {
  return (
    index === 0 ||
    timelineEvents.value[index].year !== timelineEvents.value[index - 1].year
  )
}

const getEventTypeText = (type: string) => {
  const typeMap = {
    registration: 'dateOfRegistration',
    workingGroupAcknowledgement: 'dateOfAcknowledgementByWorkingGroup',
    publicReviewStart: 'datePublicReviewStart',
    acknowledgement: 'dateOfAcknowledgementBySteeringCommittee',
  }
  return t(typeMap[type] || type)
}

const formatDate = (dateString: string) => {
  if (!isValidDate(dateString)) return dateString

  try {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (err) {
    console.warn('Error formatting date:', dateString, err)
    return dateString
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
