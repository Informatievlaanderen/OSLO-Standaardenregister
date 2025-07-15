<template>
  <div class="history-timeline">
    <div class="timeline-container" v-if="timelineEvents.length > 0">
      <div class="timeline-line"></div>

      <div
        v-for="(event, index) in timelineEvents"
        :key="`${event.standard}-${event.type}-${index}`"
        class="timeline-event"
        :class="[
          `timeline-event--${event.type}`,
          { 'timeline-event--left': index % 2 === 0 },
        ]"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-date">{{ event.date }}</div>
          <div class="timeline-title">{{ event.standard }}</div>
          <div class="timeline-type">
            {{ getEventTypeText(event.type) }}
          </div>
        </div>
      </div>
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

const props = defineProps<{
  standards: Standard[]
}>()

const timelineEvents = computed(() => {
  const events: TimelineEvent[] = []

  props.standards.forEach((standard) => {
    // Add registration date event
    if (isValidDate(standard.dateOfRegistration)) {
      events.push({
        date: formatDate(normalizeDate(standard.dateOfRegistration)),
        standard: standard.title,
        type: 'registration',
        organization: standard.responsibleOrganisation?.[0]?.name,
      })
    }

    // Add working group acknowledgement date event
    if (isValidDate(standard.dateOfAcknowledgementByWorkingGroup)) {
      events.push({
        date: formatDate(
          normalizeDate(standard.dateOfAcknowledgementByWorkingGroup),
        ),
        standard: standard.title,
        type: 'workingGroupAcknowledgement',
        organization: standard.responsibleOrganisation?.[0]?.name,
      })
    }

    // Add public review start date event
    if (isValidDate(standard.datePublicReviewStart)) {
      events.push({
        date: formatDate(normalizeDate(standard.datePublicReviewStart)),
        standard: standard.title,
        type: 'publicReviewStart',
        organization: standard.responsibleOrganisation?.[0]?.name,
      })
    }

    // Add steering committee acknowledgement date event
    if (isValidDate(standard.dateOfAcknowledgementBySteeringCommittee)) {
      events.push({
        date: formatDate(
          normalizeDate(standard.dateOfAcknowledgementBySteeringCommittee),
        ),
        standard: standard.title,
        type: 'acknowledgement',
        organization: standard.responsibleOrganisation?.[0]?.name,
      })
    }
  })

  // Sort events by date (oldest first) with additional validation
  return events
    .filter((event) => isValidDate(event.date))
    .sort((a, b) => {
      try {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } catch (err) {
        console.warn('Error sorting timeline events:', err)
        return 0
      }
    })
})

const getEventTypeText = (type: string) => {
  switch (type) {
    case 'registration':
      return t('dateOfRegistration')
    case 'workingGroupAcknowledgement':
      return t('dateOfAcknowledgementByWorkingGroup')
    case 'publicReviewStart':
      return t('datePublicReviewStart')
    case 'acknowledgement':
      return t('dateOfAcknowledgementBySteeringCommittee')
    default:
      return type
  }
}

const formatDate = (dateString: string) => {
  try {
    if (isValidDate(dateString)) {
      return new Date(dateString).toLocaleDateString('nl-BE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
    return dateString
  } catch (err) {
    console.warn('Error formatting date:', dateString, err)
    return dateString
  }
}
</script>

<style scoped lang="scss" src="./style.scss" />
