<template>
  <content-header
    title="OSLO"
    href="/standaarden"
    :subtitle="`OSLO ${$t('standardsRegistry')}`"
  />
  <vl-region>
    <vl-layout>
      <vl-grid mod-center mod-stacked>
        <vl-column width="12" width-s="12">
          <navigation />
          <vl-title
            mod-no-space-bottom
            tag-name="h1"
            id="datastandaard-title"
            >{{ data?.standard?.title }}</vl-title
          >
        </vl-column>
        <vl-column>
          <a href="/standaarden"
            ><vl-button type="button">{{ $t('backToOverview') }}</vl-button></a
          >
        </vl-column>
        <vl-column width="12">
          <DescriptionData :items="descriptionElements" />
        </vl-column>
        <vl-column width="12">
          <vl-introduction v-if="data?.markdown">
            <Markdown :markdown="data.markdown" />
          </vl-introduction>
        </vl-column>
        <vl-column width="6" width-s="12">
          <spotlight
            :title="$t('specificationDocument')"
            :subtitle="$t('normative')"
            :links="data?.standard?.specificationDocuments"
          />
        </vl-column>
        <vl-column width="6" width-s="12">
          <!-- Combination of both the documentation ash the charter -->
          <spotlight
            :title="$t('documentationAndCharter')"
            :subtitle="$t('notNormative')"
            :links="
              data?.standard?.documentation?.concat(data?.standard?.charter) ??
              []
            "
          />
        </vl-column>
        <vl-column width="6" width-s="12">
          <spotlight
            :title="$t('reportsWorkgroups')"
            :links="data?.standard?.reports"
          />
        </vl-column>
        <vl-column width="6" width-s="12">
          <spotlight
            :title="$t('presentationsAndOtherSources')"
            :links="data?.standard?.presentations"
          />
        </vl-column>
        <vl-column>
          <vl-title tag-name="h2"> {{ $t('detailInformation') }} </vl-title>
          <vl-icon-list>
            <vl-icon-list-item icon="tag">
              <span
                ><strong>{{ $t('functionalScope') }}:</strong>&nbsp;
                {{
                  data?.standard?.functionalScope ??
                  t('content.slug.semanticStandard')
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item icon="tag">
              <span
                ><strong>{{ $t('organizationalScope') }}:</strong>&nbsp;{{
                  $t('flemishAndLocalGovernments')
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.dateOfRegistration"
            >
              <span
                ><strong>{{ $t('dateOfRegistration') }}:</strong>&nbsp;{{
                  data?.standard?.dateOfRegistration
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.datePublicReviewStart"
            >
              <span
                ><strong>{{ $t('datePublicReviewStart') }}:</strong>&nbsp;{{
                  data?.standard?.datePublicReviewStart
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.datePublicReviewEnd"
            >
              <span
                ><strong>{{ $t('datePublicReviewEnd') }}:</strong>&nbsp;{{
                  data?.standard?.datePublicReviewEnd
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.dateOfAcknowledgementByWorkingGroup"
            >
              <span
                ><strong
                  >{{ $t('dateOfAcknowledgementByWorkingGroup') }}:</strong
                >&nbsp;{{
                  data?.standard?.dateOfAcknowledgementByWorkingGroup
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.dateOfAcknowledgementBySteeringCommittee"
            >
              <span
                ><strong
                  >{{ $t('dateOfAcknowledgementBySteeringCommittee') }}:</strong
                >&nbsp;{{
                  data?.standard?.dateOfAcknowledgementBySteeringCommittee
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.publicationDate"
            >
              <span
                ><strong>{{ $t('publicationDate') }}:</strong>&nbsp;{{
                  data?.standard?.publicationDate
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.endOfPublicationDate"
            >
              <span
                ><strong>{{ $t('endOfPublicationDate') }}:</strong>&nbsp;{{
                  data?.standard?.endOfPublicationDate
                }}</span
              >
            </vl-icon-list-item>
          </vl-icon-list>
        </vl-column>
        <vl-column>
          <vl-title tag-name="h2"> {{ $t('questionsAndFeedback') }}</vl-title>
          <div
            v-html="
              $t('content.slug.feedback', {
                email: 'mailto:digitaal.vlaanderen@vlaanderen.be',
                github:
                  'https://github.com/Informatievlaanderen/OSLO-Discussion',
              })
            "
          />
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import type { DescriptionData } from '~/types/descriptionData'
import type { Markdown } from '~/types/markdown'
import type { NavigationLink } from '~/types/navigationLink'

import { createAnchorElement } from '~/utils/helper.utils'
import {
  getUsageTranslation,
  Usage,
  getStatusFromUrl,
  getCategoryFromUrl,
  getUsageFromUrl,
  type Standard,
} from '~/types/standard'
import { BASEPATH } from '~/constants/constants'

const { locale, t } = useI18n()

const { params } = useRoute()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const basePath = `${BASEPATH}/${params?.slug?.[0]}/${locale?.value}`
  // using find() instead of findOne() since findOne() caused issues when the file didn't exist
  const [data, description] = await Promise.all([
    queryContent<Standard>(`${basePath}/configuration`)
      .where({ _extension: 'json' })
      .find(),
    queryContent<Markdown>(`${basePath}/description`)
      .where({ _extension: 'md' })
      .find(),
  ])

  return {
    standard: data[0],
    markdown: description[0],
  }
})

const descriptionElements: DescriptionData[] = [
  {
    title: t('responsibleOrganization'),
    element: data?.value?.standard?.responsibleOrganisation
      ? data.value.standard.responsibleOrganisation
          .map(
            (org: NavigationLink) =>
              `<a target="_blank" href="${org.resourceReference}">${org.name}</a>`,
          )
          .join(', ')
      : getUsageTranslation(Usage.TBD, t),
  },
  {
    title: t('status'),
    element: createAnchorElement(
      data?.value?.standard?.status,
      getStatusFromUrl,
      t,
    ),
  },
  {
    title: t('typeOfApplication'),
    element: createAnchorElement(
      data?.value?.standard?.usage,
      getUsageFromUrl,
      t,
    ),
  },
  {
    title: t('category'),
    element: createAnchorElement(
      data?.value?.standard?.category,
      getCategoryFromUrl,
      t,
    ),
  },
]

// Redirect to 404 in case of no data
if (!data?.value?.standard) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

definePageMeta({
  middleware: ['i18n'],
})
</script>
