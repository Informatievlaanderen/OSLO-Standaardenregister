<template>
  <!-- The JSON-LD data is embedded within a script tag with type "application/ld+json" -->
</template>
<script setup lang="ts">
import { type Standard, Usage } from "~/types/standard"

const props = defineProps({
  standards: {
    type: Array<Standard>,
  },
})

onMounted(() => {
  const jsonLdScript = document.createElement("script");
  jsonLdScript.type = "application/ld+json";
  let ld = {
    "@context": { "schema": "https://schema.org/", "xsd": "http://www.w3.org/2001/XMLSchema#" },
    "@graph": []
  };

  props.standards?.forEach((standard) => {
    /*
     * Create an entry in the graph if at least an IRI is provided for the specification.
     * All other properties are optional and added if provided to avoid that a misconfiguration
     * of a single specification would break the registry
     */
    if (standard.specificationDocuments[0]) {
      let element = {
        "@id": standard.specificationDocuments[0].resourceReference,
        "@type": "schema:TextDigitalDocument",
      }

      if (standard.title.length > 0)
        element["schema:name"] = { "@value": standard.title, "@language": "nl" }

      if (standard.status)
        element["schema:creativeWorkStatus"] = { "@id": standard.status }

      if (standard.publicationDate && standard.publicationDate !== Usage.TBD)
        element["schema:datePublished"] = { "@value": standard.publicationDate, "@type": "xsd:dateTime" }

      if (standard.responsibleOrganisation.length > 0 &&  standard.responsibleOrganisation[0].resourceReference)
        element["schema:author"] = { "@id": standard.responsibleOrganisation[0].resourceReference }

      if (standard.category && standard.category.startsWith("https://")) {
        if (!element["schema:additionalType"])
	  element["schema:additionalType"] = [];

        element["schema:additionalType"].push({ "@id": standard.category})
      }

      ld["@graph"].push(element);
    }
  });
  jsonLdScript.text = JSON.stringify(ld, null, 2);

  document.body.appendChild(jsonLdScript);
})
</script>
