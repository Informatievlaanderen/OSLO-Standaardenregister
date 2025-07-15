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
          <div class="timeline-date">{{ formatDate(event.date) }}</div>
          <div class="timeline-title">{{ event.standard }}</div>
          <div class="timeline-type">
            {{
              event.type === 'registration'
                ? $t('dateOfRegistration')
                : $t('dateOfAcknowledgementBySteeringCommittee')
            }}
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
import type { Standard } from '~/types/standard'

const props = defineProps<{
  standards: Standard[]
}>()

const timelineEvents = computed(() => {
  const events: TimelineEvent[] = []

  props.standards.forEach((standard) => {
    // Add registration date event
    if (
      standard.dateOfRegistration &&
      standard.dateOfRegistration !== 'TBD' &&
      standard.dateOfRegistration !== 'TDB'
    ) {
      events.push({
        date: standard.dateOfRegistration,
        standard: standard.title,
        type: 'registration',
        organization: standard.responsibleOrganisation?.[0]?.name,
      })
    }

    // Add steering committee acknowledgement date event
    if (
      standard.dateOfAcknowledgementBySteeringCommittee &&
      standard.dateOfAcknowledgementBySteeringCommittee !== 'TBD' &&
      standard.dateOfRegistration !== 'TDB'
    ) {
      events.push({
        date: standard.dateOfAcknowledgementBySteeringCommittee,
        standard: standard.title,
        type: 'acknowledgement',
        organization: standard.responsibleOrganisation?.[0]?.name,
      })
    }
  })

  // Sort events by date (oldest first)
  return events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('nl-BE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped lang="scss" src="./style.scss" />
