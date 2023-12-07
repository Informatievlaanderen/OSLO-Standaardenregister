<template>
  <vl-data-table class="standards-table">
    <thead>
      <tr>
        <th>Titel</th>
        <th>
          Categorie
          <vl-button
            class="modal__button"
            icon="info-filled"
            mod-icon
            mod-naked-action
            @click="
              (e: Event) =>
                onModalClick(e, {
                  title: 'Categorie standaard',
                  content:
                    '<p>Technische standaarden: de technische specificaties voor gegevensuitwisseling, ze bieden manieren aan van gestandaardiseerde gegevensuitwisseling aan.</p> <p>Standaarden voor interoperabiliteit: een stabiele specificatie voor de standaard werd ontwikkeld, aan de hand van een publieke reviewperiode wordt implementatie-ervaring opgedaan en feedback van buiten de thematische werkgroep verzameld.</p> <p>Vocabularium: de basis voor open semantische informatiestandaarden, ze bieden een gedeeld begrippenkader voor bepaalde concepten met een focus op gegevensuitwisseling.</p> <p>Applicatieprofielen: een specificatie voor gegevensuitwisseling voor applicaties die een bepaalde use case vervullen. Het laat toe om naast een gedeelde semantiek ook bijkomende restricties op te leggen, zoals het vastleggen van kardinaliteiten of het gebruik van bepaalde codelijsten.</p> <p>ImplementatieModel: een specificatie voor gegevensuitwisseling voor applicaties die een bepaalde use case vervullen, deze modellen kunnen een deel van de interne gegevensverwerking van specifieke applicaties bevatten. Het laat toe om naast een gedeelde semantiek ook bijkomende restricties op te leggen, zoals het vastleggen van kardinaliteiten of het gebruik van bepaalde codelijsten. De ontwikkeling hiervan volgt dezelfe ideologie als applicatieprofielen en vocabularia, maar heeft nog geen officiele erkenning als proces en methode.</p>',
                })
            "
          />
        </th>
        <th>
          Status
          <vl-button
            class="modal__button"
            icon="info-filled"
            mod-icon
            mod-naked-action
            @click="
              (e: Event) =>
                onModalClick(e, {
                  title: 'Status standaard',
                  content:
                    '<p>Erkende standaarden: werden na het doorlopen van een erkenningsprocedure goedgekeurd door de Werkgroep Datastandaarden van het Stuurorgaan Vlaams Informatie- en ICT-beleid als standaard binnen de Vlaamse overheid.</p><p>Kandidaat standaarden: een stabiele specificatie voor de standaard werd ontwikkeld, aan de hand van een publieke reviewperiode wordt implementatie-ervaring opgedaan en feedback van buiten de thematische werkgroep verzameld.</p> <p>Standaarden in ontwikkeling: werden reeds aangemeld bij de Werkgroep Datastandaarden en worden uitgewerkt door een thematische werkgroep aan de hand van publieke werksessies.</p>',
                })
            "
          />
        </th>
        <th>Verantwoordelijke organisatie</th>
        <th>Type toepassing</th>
        <th>Publicatiedatum</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="standards?.length" v-for="standard in pagedDatasets()">
        <td>
          <a :href="standard?.uri">{{ standard?.title }}</a>
        </td>
        <td>
          <p>
            {{ standard?.category ?? Usage.TBD }}
          </p>
        </td>
        <td>
          <p>
            {{
              (standard?.state &&
                useRemoveDashes(useCapitalizeFirstLetter(standard?.state))) ??
              Usage.TBD
            }}
          </p>
        </td>
        <td>
          <a :href="standard?.responsibleOrganisation?.uri">{{
            standard?.responsibleOrganisation?.name
          }}</a>
        </td>
        <td>
          {{ standard?.usage ?? Usage.TBD }}
        </td>
        <td>
          <p>{{ standard?.publicationDate ?? Usage.TBD }}</p>
        </td>
      </tr>
      <tr v-else>
        <td colspan="5" class="vl-u-align-center">Geen data gevonden</td>
      </tr>
    </tbody>
  </vl-data-table>
  <vl-pager mod-align="center">
    <vl-pager-bounds
      v-if="standards?.length"
      :from="paginationIndex.toString()"
      :to="maxTo().toString()"
      :total="standards?.length?.toString()"
      page-label="evenementen"
    />
    <vl-pager-item
      v-if="standards?.length"
      a11yLabel="vorige"
      label="Vorige"
      type="previous"
      @click="setPreviousIndex"
    />
    <vl-pager-item
      v-if="standards?.length"
      a11yLabel="volgende"
      type="next"
      label="Volgende"
      @click="setNextIndex"
    />
  </vl-pager>
</template>

<script setup lang="ts" name="standardsTable">
import { Usage, type Standard } from '~/types/standard'
import { type Modal } from '~/types/custom-modal'
const paginationIndex = ref(1)
const itemsPerPage = 20
const props = defineProps({
  standards: {
    type: Array<Standard>,
  },
})

const setPreviousIndex = () => {
  const value = paginationIndex.value - itemsPerPage
  if (value > 0) {
    paginationIndex.value = value
  }
}

const setNextIndex = () => {
  if (props?.standards?.length) {
    const value = paginationIndex.value + itemsPerPage
    if (value <= props.standards?.length) {
      paginationIndex.value = value
    }
  }
}

const maxTo = () => {
  if (props?.standards?.length) {
    const value = paginationIndex.value + itemsPerPage - 1
    if (value > props?.standards?.length) {
      return props?.standards?.length
    } else {
      return value
    }
  }
  return 0
}

const pagedDatasets = (): Standard[] => {
  return (
    props?.standards?.slice(
      paginationIndex.value - 1,
      paginationIndex.value + itemsPerPage - 1,
    ) ?? []
  )
}
//modal
const onModalClick = (e: Event, modal?: Modal) => {
  e.preventDefault()
  e.stopPropagation()
  document.dispatchEvent(
    new CustomEvent('modal-toggle', {
      detail: {
        modalId: 'modal-toggle-event',
        modal: {
          title: modal?.title || 'Meer info',
          content: modal?.content || 'Geen informatie beschikbaar',
        },
      },
    }),
  )
}

// reset the index when the list changes, so the first page is shown
watch(
  () => props?.standards,
  () => {
    paginationIndex.value = 1
  },
)
</script>

<style lang="scss" src="./style.scss" />
