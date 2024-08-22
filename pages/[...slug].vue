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
          <vl-title
            mod-no-space-bottom
            tag-name="h1"
            id="datastandaard-title"
            >{{ data?.standard?.title }}</vl-title
          >
        </vl-column>
        <vl-column>
          <a href="/standaarden"
            ><vl-button type="button">Terug naar het overzicht</vl-button></a
          >
        </vl-column>
        <vl-column width="12">
          <DescriptionData :items="descriptionElements" />
        </vl-column>
        <vl-column width="12">
          <vl-introduction>
            {{ data?.markdown?.description }}
          </vl-introduction>
        </vl-column>
        <vl-column width="6" width-s="12">
          <spotlight
            title="Specificatiedocument"
            subtitle="Normatief"
            :links="data?.standard?.specificationDocuments"
          />
        </vl-column>
        <vl-column width="6" width-s="12">
          <!-- Combination of both the documentation ash the charter -->
          <spotlight
            title="Aanvullende documentatie"
            subtitle="Niet-normatief"
            :links="
              data?.standard?.documentation?.concat(data?.standard?.charter) ??
              []
            "
          />
        </vl-column>
        <vl-column width="6" width-s="12">
          <spotlight
            title="Verslagen van werkgroepvergaderingen"
            :links="data?.standard?.reports"
          />
        </vl-column>
        <vl-column width="6" width-s="12">
          <spotlight
            title="Presentaties en ander materiaal"
            :links="data?.standard?.presentations"
          />
        </vl-column>
        <vl-column>
          <vl-title tag-name="h2"> Detailinformatie </vl-title>
          <vl-icon-list>
            <vl-icon-list-item icon="tag">
              <span
                ><strong>Functioneel toepassingsgebied:</strong
                >&nbsp;Semantische standaard voor informatie met
                dossieren.</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item icon="tag">
              <span
                ><strong>Organisatorisch werkingsgebied:</strong>&nbsp;Vlaamse
                en lokale overheden</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.dateOfRegistration"
            >
              <span
                ><strong>Datum van aanmelding:</strong>&nbsp;{{
                  data?.standard?.dateOfRegistration
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.datePublicReviewStart"
            >
              <span
                ><strong>Start publieke review:</strong>&nbsp;{{
                  data?.standard?.datePublicReviewStart
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.datePublicReviewEnd"
            >
              <span
                ><strong>Einde publieke review:</strong>&nbsp;{{
                  data?.standard?.datePublicReviewEnd
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.dateOfAcknowledgementByWorkingGroup"
            >
              <span
                ><strong>Erkenning door werkgroep datastandaarden:</strong
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
                  >Erkenning door stuurorgaan Vlaams Informatie- en
                  ICT-beleid:</strong
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
                ><strong>Publicatiedatum:</strong>&nbsp;{{
                  data?.standard?.publicationDate
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.standard?.endOfPublicationDate"
            >
              <span
                ><strong>Publicatie uit dienst sinds:</strong>&nbsp;{{
                  data?.standard?.endOfPublicationDate
                }}</span
              >
            </vl-icon-list-item>
          </vl-icon-list>
        </vl-column>
        <vl-column>
          <vl-title tag-name="h2"> Vragen en feedback</vl-title>
          <p>
            In geval van vragen of feedback kan u contact opnemen
            <a :href="`mailto:digitaal.vlaanderen@vlaanderen.be`">via e-mail</a>
            of een topic aanmaken in onze publieke
            <a
              href="https://github.com/Informatievlaanderen/OSLO-Discussion"
              title="GitHub issue-tracker"
              >GitHub issue-tracker</a
            >.
          </p>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import type { Description } from '~/types/description'
import type { DescriptionData } from '~/types/descriptionData'
import type { NavigationLink } from '~/types/navigationLink'
import { Usage, type Standard } from '~/types/standard'

const { params } = useRoute()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  // using find() instead of findOne() since findOne() caused issues when the file didn't exist
  const [data, description] = await Promise.all([
    queryContent<Standard>(`standaarden/${params?.slug?.[0]}`)
      .where({ _extension: 'json' })
      .find(),
    queryContent<Description>(`standaarden/${params?.slug?.[0]}/`)
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
    title: 'Verantwoordelijke organisatie',
    element: data?.value?.standard?.responsibleOrganisation
      ? data.value.standard.responsibleOrganisation
          .map(
            (org: NavigationLink) =>
              `<a href="${org.resourceReference}">${org.name}</a>`,
          )
          .join(', ')
      : Usage.TBD,
  },
  {
    title: 'Status',
    element: !!data?.value?.standard?.status
      ? useRemoveDashes(useCapitalizeFirstLetter(data?.value?.standard?.status))
      : Usage.TBD,
  },
  {
    title: 'Type toepassing',
    element: data?.value?.standard?.usage ?? Usage.TBD,
  },
  {
    title: 'Categorie',
    element: data?.value?.standard?.category ?? Usage.TBD,
  },
]

// Redirect to 404 in case of no data
if (!data?.value?.standard) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}
</script>
