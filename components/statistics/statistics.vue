<template>
  <vl-grid mod-stacked mod-center>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="props.statistics?.standards?.length"
          mod-xlarge
        />
        <p>Standaarden</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge mod-accent :initials="recognized?.length" mod-xlarge />
        <p>Erkende standaarden</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge mod-accent :initials="candidates?.length" mod-xlarge />
        <p>Kandidaat standaarden</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge mod-accent :initials="development?.length" mod-xlarge />
        <p>Standaarden in ontwikkeling</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="props.statistics?.uniqueContributors"
          mod-xlarge
        />
        <p>Mensen hielpen mee</p>
      </div>
    </vl-column>
    <vl-column class="center" width="6" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="props.statistics?.uniqueAffiliations"
          mod-xlarge
        />
        <p>Organisaties waren actief</p>
      </div>
    </vl-column>
  </vl-grid>
</template>

<script setup lang="ts" name="spotlight">
import { Status } from '~/types/standard'
import type { StatisticStandard, Statistics } from '~/types/statistics'

const props = defineProps({
  statistics: {
    type: Object as PropType<Statistics>,
    required: false,
  },
})

const recognized: StatisticStandard[] | undefined =
  props.statistics?.standards?.filter(
    (standard) => standard?.status === Status.RECOGNIZED,
  )
const candidates: StatisticStandard[] | undefined =
  props.statistics?.standards?.filter(
    (standard) => standard?.status === Status.CANDIDATE,
  )
const development: StatisticStandard[] | undefined =
  props.statistics?.standards?.filter(
    (standard) => standard?.status === Status.DEVELOPMENT,
  )
</script>

<style lang="scss" src="./style.scss" />
