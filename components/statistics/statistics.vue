<template>
  <vl-grid mod-stacked mod-center>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge :initials="totalAmount.toString()" mod-accent mod-xlarge />
        <p>{{ $t('standards') }}</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="statistics.totalErkend.toString()"
          mod-xlarge
        />
        <p>{{ $t('recognizedStandards') }}</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="statistics.totalKandidaat.toString()"
          mod-xlarge
        />
        <p>{{ $t('candidateStandards') }}</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="statistics.totalOntwerp.toString()"
          mod-xlarge
        />
        <p>{{ $t('developmentStandards') }}</p>
      </div>
    </vl-column>
    <vl-column class="center" width="4" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="props.statistics?.uniqueContributors"
          mod-xlarge
        />
        <p>{{ $t('peopleWhoHelped') }}</p>
      </div>
    </vl-column>
    <vl-column class="center" width="6" width-s="12">
      <div class="vertical-center">
        <vl-badge
          mod-accent
          :initials="props.statistics?.uniqueAffiliations"
          mod-xlarge
        />
        <p>{{ $t('organizationsWhoHelped') }}</p>
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

const totalAmount: number =
  props.statistics?.totalErkend +
  props.statistics?.totalKandidaat +
  props.statistics?.totalOntwerp
</script>

<style lang="scss" src="./style.scss" />
