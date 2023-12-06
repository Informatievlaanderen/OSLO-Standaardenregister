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
              data?.title
            }}</vl-title>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData
              v-if="data?.organisation"
              title="Verantwoordelijke organisatie"
            >
              <a :href="data?.organisation?.href">{{
                data?.organisation?.title
              }}</a>
            </descriptionData>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData v-if="data?.datePublished" title="Publicatiedatum">
              <p>{{ data?.datePublished }}</p>
            </descriptionData>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData v-if="data?.usageType" title="Type toepassing">
              <p>{{ data?.usageType }}</p>
            </descriptionData>
          </vl-column>
          <vl-column width="3" width-s="6">
            <descriptionData v-if="data?.category" title="Categorie">
              <p>{{ data?.category }}</p>
            </descriptionData>
          </vl-column>
          <vl-column width="12">
            <vl-region>
              <vl-introduction>
                {{ data?.description }}
              </vl-introduction>
            </vl-region>
          </vl-column>
          <vl-column width="6" width-s="12">
            <spotlight
              title="Specificatiedocument"
              subtitle="Normatief"
              :links="data?.specificationDocuments"
            />
          </vl-column>
          <vl-column width="6" width-s="12">
            <spotlight
              title="Aanvullende documentatie"
              subtitle="Niet-normatief"
              :links="data?.relatedDocuments"
            />
          </vl-column>
          <vl-column width="6" width-s="12">
            <spotlight
              title="Verslagen van werkgroepvergaderingen"
              :links="data?.reportsWorkgroups"
            />
          </vl-column>
          <vl-column width="6" width-s="12">
            <spotlight
              title="Presentaties en ander materiaal"
              :links="data?.presentationsAndOthers"
            />
          </vl-column>
        </vl-grid>
        <vl-region>
          <vl-title tag-name="h2"> Detailinformatie </vl-title>
          <vl-icon-list>
            <vl-icon-list-item icon="tag" v-if="data?.details?.functionalScope">
              <span
                ><strong>Functioneel toepassingsgebied:</strong>&nbsp;{{
                  data?.details?.functionalScope
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.details?.organizationalScope"
            >
              <span
                ><strong>Organisatorisch werkingsgebied:</strong>&nbsp;{{
                  data?.details?.organizationalScope
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.details?.dateRegistration"
            >
              <span
                ><strong>Datum van aanmelding:</strong>&nbsp;{{
                  data?.details?.dateRegistration
                }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.details?.dateRecognitionWorkgroup"
            >
              <span
                ><strong>Erkenning door werkgroep datastandaarden:</strong
                >&nbsp;{{ data?.details?.dateRecognitionWorkgroup }}</span
              >
            </vl-icon-list-item>
            <vl-icon-list-item
              icon="tag"
              v-if="data?.details?.dateRecognitionFlemishICTPolicy"
            >
              <span
                ><strong
                  >Erkenning door stuurorgaan Vlaams Informatie- en
                  ICT-beleid:</strong
                >&nbsp;{{
                  data?.details?.dateRecognitionFlemishICTPolicy
                }}</span
              >
            </vl-icon-list-item>
          </vl-icon-list>
        </vl-region>
        <vl-region>
          <vl-title tag-name="h2"> Vragen en feedback </vl-title>
          <p>
            In geval van vragen of feedback kan u contact opnemen
            <a :href="`mailto:${data?.questionsAndFeedback?.email}`"
              >via e-mail</a
            >
            of een topic aanmaken in onze publieke
            <a
              :href="data?.questionsAndFeedback?.githubQuestions?.href"
              title="GitHub issue-tracker"
              >{{ data?.questionsAndFeedback?.githubQuestions?.title }}</a
            >.
          </p>
        </vl-region>
      </vl-region>
    </vl-layout>
    <content-footer />
  </vl-region>
</template>

<script setup lang="ts">
import type { Standard } from '~/types/standard'

const { params } = useRoute()

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [data] = await Promise.all([
    queryContent<Standard>(
      `standaarden/kandidaat-standaard/${params?.slug?.[0]}/configuration`,
    ).find(),
  ])
  return data[0]
})
// Redirect to 404 in case of no data
if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>
