<template>
  <div class="history-timeline" ref="timelineContainer" @scroll="handleScroll">
    <div v-if="timelineEvents.length > 0" class="timeline-container">
      <div class="timeline-line"></div>
      <div class="year-container">
        <div class="year-indicator">
          <div
            v-for="year in availableYears"
            :key="year"
            class="year-indicator-item"
            :class="{ active: year === currentVisibleYear }"
            @click="scrollToYear(year)"
          >
            <span class="year-indicator-text">{{ year }}</span>
          </div>
        </div>
      </div>

      <template
        v-for="(event, index) in timelineEvents"
        :key="`${event.standard}-${event.type}-${index}`"
      >
        <div
          v-if="shouldShowYearDivider(index)"
          class="year-divider"
          :data-year="event.year"
          :ref="(el) => el && (yearRefs[event.year] = el as HTMLElement)"
        >
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
import { TimelineEventType, type TimelineEvent } from '~/types/history'
import { normalizeDate, isValidDate } from '~/utils/date.utils'
import type { Standard } from '~/types/standard'

const { t } = useI18n()
const props = defineProps<{ standards: Standard[] }>()

const timelineContainer = ref<HTMLElement | undefined>()
const yearRefs = ref<Record<number, HTMLElement>>({})
const currentVisibleYear = ref<number | null>(null)

const eventTypes = [
  { field: 'dateOfRegistration', type: TimelineEventType.Registration },
  {
    field: 'dateOfAcknowledgementByWorkingGroup',
    type: TimelineEventType.WorkingGroupAcknowledgement,
  },
  { field: 'datePublicReviewStart', type: TimelineEventType.PublicReviewStart },
  {
    field: 'dateOfAcknowledgementBySteeringCommittee',
    type: TimelineEventType.Acknowledgement,
  },
]

const timelineEvents = computed(() => {
  const events: TimelineEvent[] = []

  props.standards.forEach((standard) => {
    eventTypes.forEach(({ field, type }) => {
      if (isValidDate(standard[field] as string)) {
        events.push({
          date: formatDate(normalizeDate(standard[field] as string)),
          standard: standard.title,
          link: standard.specificationDocuments?.[0]?.resourceReference,
          type,
          organization: standard.responsibleOrganisation?.[0]?.name,
          year: new Date(standard[field] as string).getFullYear(),
        })
      }
    })
  })

  return events
    .filter((event) => isValidDate(event.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

// Get unique years from timeline events
const availableYears = computed(() => {
  const years = [...new Set(timelineEvents.value.map((event) => event.year))]
  return years.sort((a, b) => a - b)
})

const shouldShowYearDivider = (index: number): boolean => {
  return (
    index === 0 ||
    timelineEvents.value[index].year !== timelineEvents.value[index - 1].year
  )
}

// Handle scroll to determine which year is currently visible
const handleScroll = () => {
  if (!timelineContainer.value) return

  const containerRect = timelineContainer.value.getBoundingClientRect()
  const containerTop = containerRect.top
  const containerCenter = containerTop + containerRect.height / 2

  let closestYear: number | null = null
  let minDistance = Infinity

  // Find the year divider closest to the center of the viewport
  Object.entries(yearRefs.value).forEach(([year, element]) => {
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const elementCenter = elementRect.top + elementRect.height / 2
      const distance = Math.abs(elementCenter - containerCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestYear = parseInt(year)
      }
    }
  })

  currentVisibleYear.value = closestYear
}

// Scroll to a specific year
const scrollToYear = (year: number) => {
  const yearElement = yearRefs.value[year]
  if (yearElement && timelineContainer.value) {
    const containerRect = timelineContainer.value.getBoundingClientRect()
    const elementRect = yearElement.getBoundingClientRect()

    const scrollTop = timelineContainer.value.scrollTop
    const offset = elementRect.top - containerRect.top + scrollTop - 100 // 100px offset from top

    timelineContainer.value.scrollTo({
      top: offset,
      behavior: 'smooth',
    })
  }
}

// Set initial visible year on mount
onMounted(() => {
  nextTick(() => {
    handleScroll()
  })
})

const getEventTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
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
