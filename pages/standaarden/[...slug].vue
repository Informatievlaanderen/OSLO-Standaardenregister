<template>
  <vl-region>
    <content-header
      title="OSLO"
      href="https://data.vlaanderen.be/standaarden"
      subtitle="Standaardenregister"
    />
    <vl-layout>
      <vl-region>
        <a href="/"
          ><vl-button type="button">Terug naar het overzicht</vl-button></a
        >
      </vl-region>
      <vl-region>
        <vl-grid>
          <vl-column width="12" width-s="12">
            <vl-title tag-name="h1" id="datastandaard-title">{{
              data?.standard?.title
            }}</vl-title>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData
              v-if="data?.standard?.responsibleOrganisation"
              title="Verantwoordelijke organisatie"
            >
              <a :href="data?.standard?.responsibleOrganisation?.uri">{{
                data?.standard?.responsibleOrganisation?.name
              }}</a>
            </descriptionData>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData title="Status">
              <p>{{ data?.standard?.state ?? Usage.TBD }}</p>
            </descriptionData>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData title="Type toepassing">
              <p>{{ data?.standard?.usage ?? Usage.TBD }}</p>
            </descriptionData>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData title="Categorie">
              <p>{{ data?.standard?.category ?? Usage.TBD }}</p>
            </descriptionData>
          </vl-column>
          <vl-column width="12">
            <vl-region>
              <vl-introduction>
                {{ data?.markdown?.description }}
              </vl-introduction>
            </vl-region>
          </vl-column>
          <vl-column width="6" width-s="12">
            <spotlight
              title="Specificatiedocument"
              subtitle="Normatief"
              :links="data?.standard?.specificationDocuments"
            />
          </vl-column>
          <vl-column width="6" width-s="12">
            <spotlight
              title="Aanvullende documentatie"
              subtitle="Niet-normatief"
              :links="data?.standard?.documentation"
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
        </vl-grid>
        <vl-region>
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
          </vl-icon-list>
        </vl-region>
        <vl-region>
          <vl-title tag-name="h2"> Vragen en feedback </vl-title>
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
        </vl-region>
      </vl-region>
    </vl-layout>
    <content-footer />
  </vl-region>
</template>

<script setup lang="ts">
import type { Description } from '~/types/description'
import { Usage, type Standard } from '~/types/standard'

const { params } = useRoute()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  // using find() instead of findOne() since findOne() caused issues when the file didn't exist
  const [data, description] = await Promise.all([
    queryContent<Standard>(
      `standaarden/${params?.slug?.[0]}/configuration`,
    ).find(),
    queryContent<Description>(`standaarden/${params?.slug?.[0]}/`)
      .where({ _extension: 'md' })
      .find(),
  ])

  return {
    standard: data[0],
    markdown: description[0],
  }
})
// Redirect to 404 in case of no data
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>
