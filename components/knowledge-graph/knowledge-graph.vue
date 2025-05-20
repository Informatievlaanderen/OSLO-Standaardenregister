<template>
  <div class="knowledge-graph" ref="graph" />
</template>

<script setup name="knowledgeGraph" lang="js">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const graph = ref(null)

// interface Node {
//   id: string
//   group: string
// }

// interface Link {
//   source: string
//   target: string
//   value: number
// }

// interface Standard {
//   title: string
//   organization: string
//   domain: string
// }

onMounted(async () => {
  try {
    const data = [
      {
        title: 'API guidelines',
        'Zonder AP/VOC': 'guidelines',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Applicatieprofiel Adresregister',
        'Zonder AP/VOC': 'Adresregister',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Bedrijventerrein',
        'Zonder AP/VOC': 'Bedrijventerrein',
        organization: 'Agentschap Innoveren en Ondernemen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000039',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Besluit Mobiliteit',
        'Zonder AP/VOC': 'Besluit Mobiliteit',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Besluit Publicatie',
        'Zonder AP/VOC': 'Besluit Publicatie',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel Besluit Subsidies',
        'Zonder AP/VOC': 'Besluit Subsidies',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Financiën',
      },
      {
        title: 'Applicatieprofiel Besluitvorming',
        'Zonder AP/VOC': 'Besluitvorming',
        organization: 'Departement Kanselarij en Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001827',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel Bestuurlijk Sanctieregister',
        'Zonder AP/VOC': 'Bestuurlijk Sanctieregister',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel Bodem',
        'Zonder AP/VOC': 'Bodem',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Bodem en Ondergrond',
        'Zonder AP/VOC': 'Bodem en Ondergrond',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Bodem en Ondergrond Interpretaties',
        'Zonder AP/VOC': 'Bodem en Ondergrond Interpretaties',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Bodem en Ondergrond Observaties',
        'Zonder AP/VOC': 'Bodem en Ondergrond Observaties',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Contactvoorkeuren',
        'Zonder AP/VOC': 'Contactvoorkeuren',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Cultureel Erfgoed Event',
        'Zonder AP/VOC': 'Cultureel Erfgoed Event',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Applicatieprofiel Cultureel Erfgoed Object',
        'Zonder AP/VOC': 'Cultureel Erfgoed Object',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Applicatieprofiel Cultuur- en Jeugdinfrastructuur',
        'Zonder AP/VOC': 'Cultuur- en Jeugdinfrastructuur',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Applicatieprofiel Cultuurparticipatie',
        'Zonder AP/VOC': 'Cultuurparticipatie',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Applicatieprofiel DCAT-AP VL',
        'Zonder AP/VOC': 'DCAT-AP VL',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Applicatieprofiel DCAT-AP VL 2.0',
        'Zonder AP/VOC': 'DCAT-AP VL 2.0',
        organization: 'Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Applicatieprofiel Dienst Transactiemodel',
        'Zonder AP/VOC': 'Dienst Transactiemodel',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Dienstencataloog',
        'Zonder AP/VOC': 'Dienstencataloog',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Digitale Watermeter',
        'Zonder AP/VOC': 'Digitale Watermeter',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Dossier',
        'Zonder AP/VOC': 'Dossier',
        organization: 'Agentschap Facilitair Bedrijf',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO001834',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel Energiehuis',
        'Zonder AP/VOC': 'Energiehuis',
        organization: '',
        'Organization Reference': '',
        domain: 'Energie',
      },
      {
        title: 'Applicatieprofiel Erosiepoel',
        'Zonder AP/VOC': 'Erosiepoel',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Feitelijke Verenigingen',
        'Zonder AP/VOC': 'Feitelijke Verenigingen',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Fietsinfrastructuur',
        'Zonder AP/VOC': 'Fietsinfrastructuur',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel FinanciÃ«le Rapportering',
        'Zonder AP/VOC': 'FinanciÃ«le Rapportering',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Financiën',
      },
      {
        title: 'Applicatieprofiel Gebouwenregister',
        'Zonder AP/VOC': 'Gebouwenregister',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Generiek basis',
        'Zonder AP/VOC': 'Generiek basis',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Generieke Terugmeldfaciliteit',
        'Zonder AP/VOC': 'Generieke Terugmeldfaciliteit',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel GeoDCAT-AP VL',
        'Zonder AP/VOC': 'GeoDCAT-AP VL',
        organization: 'Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Applicatieprofiel Grondboringen',
        'Zonder AP/VOC': 'Grondboringen',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Grondwatermeetnet',
        'Zonder AP/VOC': 'Grondwatermeetnet',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Hulp- en Dienstverlening aan Gedetineerden',
        'Zonder AP/VOC': 'Hulp- en Dienstverlening aan Gedetineerden',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Welzijn',
      },
      {
        title: 'Applicatieprofiel Incentiveringsplatform',
        'Zonder AP/VOC': 'Incentiveringsplatform',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Economie',
      },
      {
        title: 'Applicatieprofiel Inname openbaar domein',
        'Zonder AP/VOC': 'Inname openbaar domein',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Issue tracking voor burgers en organisaties',
        'Zonder AP/VOC': 'Issue tracking voor burgers en organisaties',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Kabels en Leidingen',
        'Zonder AP/VOC': 'Kabels en Leidingen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Kindfiche',
        'Zonder AP/VOC': 'Kindfiche',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Welzijn',
      },
      {
        title: 'Applicatieprofiel LDES',
        'Zonder AP/VOC': 'LDES',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Applicatieprofiel Leerinschrijfcredential',
        'Zonder AP/VOC': 'Leerinschrijfcredential',
        organization: 'Athumi',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO051320',
        domain: 'Onderwijs',
      },
      {
        title: 'Applicatieprofiel Leerprestatiecredential',
        'Zonder AP/VOC': 'Leerprestatiecredential',
        organization: 'Athumi',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO051320',
        domain: 'Onderwijs',
      },
      {
        title: 'Applicatieprofiel Lokale Economie',
        'Zonder AP/VOC': 'Lokale Economie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Economie',
      },
      {
        title: 'Applicatieprofiel loongegevens',
        'Zonder AP/VOC': 'loongegevens',
        organization: 'Agentschap Uitbetaling Groeipakket',
        'Organization Reference':
          'https://data.vlaanderen.be/doc/organisatie/OVO008643',
        domain: 'Financiën',
      },
      {
        title: 'Applicatieprofiel Mandatendatabank',
        'Zonder AP/VOC': 'Mandatendatabank',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel metadata DCAT',
        'Zonder AP/VOC': 'metadata DCAT',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title:
          'Applicatieprofiel Mobiliteit: Dienstregeling en Planning Stopplaatsen',
        'Zonder AP/VOC': 'Mobiliteit: Dienstregeling en Planning Stopplaatsen',
        organization: 'De Lijn',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000100',
        domain: 'Mobiliteit',
      },
      {
        title:
          'Applicatieprofiel Mobiliteit: Dienstregeling en Planning Tijdstabellen',
        'Zonder AP/VOC': 'Mobiliteit: Dienstregeling en Planning Tijdstabellen',
        organization: 'De Lijn',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000100',
        domain: 'Mobiliteit',
      },
      {
        title:
          'Applicatieprofiel Mobiliteit: Dienstregeling en Planning Voertuigplanning',
        'Zonder AP/VOC':
          'Mobiliteit: Dienstregeling en Planning Voertuigplanning',
        organization: 'De Lijn',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000100',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Mobiliteit: Intelligente Toegang',
        'Zonder AP/VOC': 'Mobiliteit: Intelligente Toegang',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Mobiliteit: Trips en Aanbod',
        'Zonder AP/VOC': 'Mobiliteit: Trips en Aanbod',
        organization: 'Departement Mobiliteit en Openbare Werken',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000096',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Mobiliteitsbudget',
        'Zonder AP/VOC': 'Mobiliteitsbudget',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Notificatie Basis',
        'Zonder AP/VOC': 'Notificatie Basis',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Observaties en Metingen',
        'Zonder AP/VOC': 'Observaties en Metingen',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Omgevingsvergunning',
        'Zonder AP/VOC': 'Omgevingsvergunning',
        organization: 'Departement Omgeving',
        'Organization Reference':
          'https://data.vlaanderen.be/doc/organisatie/OVO003323',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Openbaar domain',
        'Zonder AP/VOC': 'Openbaar domain',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Organisatie Basis',
        'Zonder AP/VOC': 'Organisatie Basis',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel OSLO Datakwaliteit',
        'Zonder AP/VOC': 'OSLO Datakwaliteit',
        organization: 'Vlaamse Milieumaatschappij (VMM)',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000092',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel OSLO Slimme Stadsdistributie',
        'Zonder AP/VOC': 'OSLO Slimme Stadsdistributie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel OSLO Statistiek',
        'Zonder AP/VOC': 'OSLO Statistiek',
        organization: 'Vlaamse Milieumaatschappij (VMM)',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000092',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel OSLO Waterkwaliteit',
        'Zonder AP/VOC': 'OSLO Waterkwaliteit',
        organization: 'Vlaamse Milieumaatschappij (VMM)',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000092',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Overlijdensaangifte',
        'Zonder AP/VOC': 'Overlijdensaangifte',
        organization: 'Athumi',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO051320',
        domain: 'Welzijn',
      },
      {
        title: 'Applicatieprofiel Passenger Transport Hubs',
        'Zonder AP/VOC': 'Passenger Transport Hubs',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Perceel',
        'Zonder AP/VOC': 'Perceel',
        organization: 'Agentschap Innoveren en Ondernemen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000039',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Persoon basis',
        'Zonder AP/VOC': 'Persoon basis',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Publicatie-Advertentie',
        'Zonder AP/VOC': 'Publicatie-Advertentie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Applicatieprofiel Ruimtelijke Bereiken',
        'Zonder AP/VOC': 'Ruimtelijke Bereiken',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Ruimtelijke Indicatoren',
        'Zonder AP/VOC': 'Ruimtelijke Indicatoren',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Schuldbeheer',
        'Zonder AP/VOC': 'Schuldbeheer',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Financiën',
      },
      {
        title: 'Applicatieprofiel Sensoren en Bemonstering',
        'Zonder AP/VOC': 'Sensoren en Bemonstering',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Slimme Raadpleegomgeving',
        'Zonder AP/VOC': 'Slimme Raadpleegomgeving',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel Sonderingen',
        'Zonder AP/VOC': 'Sonderingen',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Toeristische Logies Basis',
        'Zonder AP/VOC': 'Toeristische Logies Basis',
        organization: 'Toerisme Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000034',
        domain: 'Cultuur',
      },
      {
        title: 'Applicatieprofiel Vastgoed',
        'Zonder AP/VOC': 'Vastgoed',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Applicatieprofiel Verkeersborden',
        'Zonder AP/VOC': 'Verkeersborden',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Verkeersmetingen',
        'Zonder AP/VOC': 'Verkeersmetingen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Vervoersknooppunten',
        'Zonder AP/VOC': 'Vervoersknooppunten',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Vlaamse Codex',
        'Zonder AP/VOC': 'Vlaamse Codex',
        organization: 'Departement Kanselarij en Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001827',
        domain: 'Wetgeving',
      },
      {
        title: 'Applicatieprofiel Vrachtwagenparkeren',
        'Zonder AP/VOC': 'Vrachtwagenparkeren',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Applicatieprofiel Wegenregister',
        'Zonder AP/VOC': 'Wegenregister',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Conformiteitsraamwerk voor data standaarden',
        'Zonder AP/VOC': 'voor data standaarden',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Data standaarden wegenenverkeer',
        'Zonder AP/VOC': 'standaarden wegenenverkeer',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Technische standaard',
      },
      {
        title: 'Generieke Hypermedia API',
        'Zonder AP/VOC': 'Hypermedia API',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Implementatiemodel Basisregistratie Cultureel Erfgoed',
        'Zonder AP/VOC': 'Basisregistratie Cultureel Erfgoed',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Implementatiemodel Kwaliteit Wegen en Wegmarkeringen',
        'Zonder AP/VOC': 'Kwaliteit Wegen en Wegmarkeringen',
        organization: 'stad Roeselare',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002220',
        domain: 'Mobiliteit',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Begraafplaatsenbeheer',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Begraafplaatsenbeheer',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Begroeid Voorkomen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Begroeid Voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Infrastructuurelementen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Infrastructuurelementen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Onbegroeid Voorkomen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Onbegroeid Voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Terreindelen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Terreindelen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Vegetatie-elementen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Vegetatie-elementen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Water voorkomen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Water voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Applicatieprofiel Waterdelen',
        'Zonder AP/VOC': 'domain - Applicatieprofiel Waterdelen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Uitbreiding Begraafplaats (Vocabularium)',
        'Zonder AP/VOC': 'domain - Uitbreiding Begraafplaats (Vocabularium)',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Uitbreiding Gebieden (Vocabularium)',
        'Zonder AP/VOC': 'domain - Uitbreiding Gebieden (Vocabularium)',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title:
          'Openbaar domain - Uitbreiding Infrastructuurelementen (Vocabularium)',
        'Zonder AP/VOC':
          'domain - Uitbreiding Infrastructuurelementen (Vocabularium)',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Uitbreiding Terreindelen (Vocabularium)',
        'Zonder AP/VOC': 'domain - Uitbreiding Terreindelen (Vocabularium)',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title:
          'Openbaar domain - Uitbreiding Vegetatie-elementen (Vocabularium)',
        'Zonder AP/VOC':
          'domain - Uitbreiding Vegetatie-elementen (Vocabularium)',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain - Uitbreiding Waterdelen (Vocabularium)',
        'Zonder AP/VOC': 'domain - Uitbreiding Waterdelen (Vocabularium)',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0',
        'Zonder AP/VOC': 'domain 2.0.0',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Begraafplaatsen',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Begraafplaatsen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title:
          'Openbaar domain 2.0.0 - Applicatieprofiel Begraafplaatsenbeheer',
        'Zonder AP/VOC':
          'domain 2.0.0 - Applicatieprofiel Begraafplaatsenbeheer',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Begroeid Voorkomen',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Begroeid Voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Gebieden',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Gebieden',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title:
          'Openbaar domain 2.0.0 - Applicatieprofiel Infrastructuurelementen',
        'Zonder AP/VOC':
          'domain 2.0.0 - Applicatieprofiel Infrastructuurelementen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Onbegroeid Voorkomen',
        'Zonder AP/VOC':
          'domain 2.0.0 - Applicatieprofiel Onbegroeid Voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Terreindelen',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Terreindelen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Vegetatie-elementen',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Vegetatie-elementen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Waterdelen',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Waterdelen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Applicatieprofiel Watervoorkomen',
        'Zonder AP/VOC': 'domain 2.0.0 - Applicatieprofiel Watervoorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Basisprofiel Openbaar domain',
        'Zonder AP/VOC': 'domain 2.0.0 - Basisprofiel Openbaar domain',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Begraafplaats',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Begraafplaats',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Begroeid Voorkomen',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Begroeid Voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Gebied',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Gebied',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Infrastructuur',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Infrastructuur',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Onbegroeid Voorkomen',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Onbegroeid Voorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Terreindeel',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Terreindeel',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Vegetatie',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Vegetatie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Waterdeel',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Waterdeel',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Openbaar domain 2.0.0 - Uitbreiding Watervoorkomen',
        'Zonder AP/VOC': 'domain 2.0.0 - Uitbreiding Watervoorkomen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'OSLO Voorwaarden Dienstverlening',
        'Zonder AP/VOC': 'Voorwaarden Dienstverlening',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title:
          'Proces en methode voor de ontwikkeling en erkenning van data standaarden',
        'Zonder AP/VOC':
          'en methode voor de ontwikkeling en erkenning van data standaarden',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title:
          'Proces en methode voor de ontwikkeling en erkenning van data standaarden voor Agentschap Wegen en Verkeer',
        'Zonder AP/VOC':
          'en methode voor de ontwikkeling en erkenning van data standaarden voor Agentschap Wegen en Verkeer',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Vlaamse URI-Standaard voor Data',
        'Zonder AP/VOC': 'URI-Standaard voor Data',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Technische standaard',
      },
      {
        title: 'Vocabularia en Applicatieprofielen Bodem en Ondergrond',
        'Zonder AP/VOC': 'en Applicatieprofielen Bodem en Ondergrond',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Adres',
        'Zonder AP/VOC': 'Adres',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Bedrijventerrein',
        'Zonder AP/VOC': 'Bedrijventerrein',
        organization: 'Agentschap Innoveren en Ondernemen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000039',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Besluit',
        'Zonder AP/VOC': 'Besluit',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Wetgeving',
      },
      {
        title: 'Vocabularium Besluitvorming',
        'Zonder AP/VOC': 'Besluitvorming',
        organization: 'Departement Kanselarij en Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001827',
        domain: 'Wetgeving',
      },
      {
        title: 'Vocabularium Bestuur',
        'Zonder AP/VOC': 'Bestuur',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Wetgeving',
      },
      {
        title: 'Vocabularium Bestuurlijke Sancties',
        'Zonder AP/VOC': 'Bestuurlijke Sancties',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Wetgeving',
      },
      {
        title: 'Vocabularium Bodem',
        'Zonder AP/VOC': 'Bodem',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Bodem en Ondergrond',
        'Zonder AP/VOC': 'Bodem en Ondergrond',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Bodem en Ondergrond Interpretaties',
        'Zonder AP/VOC': 'Bodem en Ondergrond Interpretaties',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Bodem en Ondergrond Observaties',
        'Zonder AP/VOC': 'Bodem en Ondergrond Observaties',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Conceptueel Gegevensmodel Openbaar domain',
        'Zonder AP/VOC': 'Conceptueel Gegevensmodel Openbaar domain',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Cultureel Erfgoed',
        'Zonder AP/VOC': 'Cultureel Erfgoed',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Vocabularium Cultuur- en Jeugdinfrastructuur',
        'Zonder AP/VOC': 'Cultuur- en Jeugdinfrastructuur',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Vocabularium Cultuurparticipatie',
        'Zonder AP/VOC': 'Cultuurparticipatie',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Cultuur',
      },
      {
        title: 'Vocabularium Dienst',
        'Zonder AP/VOC': 'Dienst',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Dossier',
        'Zonder AP/VOC': 'Dossier',
        organization: 'Agentschap Facilitair Bedrijf',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO001834',
        domain: 'Wetgeving',
      },
      {
        title: 'Vocabularium en applicatieprofiel air and water',
        'Zonder AP/VOC': 'en applicatieprofiel air and water',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium en applicatieprofiel OSLO Consent',
        'Zonder AP/VOC': 'en applicatieprofiel OSLO Consent',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium en implementatiemodel IPDC - LPDC',
        'Zonder AP/VOC': 'en implementatiemodel IPDC - LPDC',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Energiehuis',
        'Zonder AP/VOC': 'Energiehuis',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference': null,
        domain: 'Energie',
      },
      {
        title: 'Vocabularium Erosiepoel',
        'Zonder AP/VOC': 'Erosiepoel',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Feitelijke Verenigingen',
        'Zonder AP/VOC': 'Feitelijke Verenigingen',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Fietsinfrastructuur',
        'Zonder AP/VOC': 'Fietsinfrastructuur',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium FinanciÃ«le Rapportering',
        'Zonder AP/VOC': 'FinanciÃ«le Rapportering',
        organization: 'Departement Cultuur, Jeugd en Media',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000067',
        domain: 'Financiën',
      },
      {
        title: 'Vocabularium Gebouw',
        'Zonder AP/VOC': 'Gebouw',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Generiek',
        'Zonder AP/VOC': 'Generiek',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Gezondheidstoestand Persoon',
        'Zonder AP/VOC': 'Gezondheidstoestand Persoon',
        organization: 'Athumi',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO051320',
        domain: 'Welzijn',
      },
      {
        title: 'Vocabularium Grondboringen',
        'Zonder AP/VOC': 'Grondboringen',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Hulp- en Dienstverlening aan Gedetineerden',
        'Zonder AP/VOC': 'Hulp- en Dienstverlening aan Gedetineerden',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Welzijn',
      },
      {
        title: 'Vocabularium Incentiveringsplatform',
        'Zonder AP/VOC': 'Incentiveringsplatform',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Financiën',
      },
      {
        title: 'Vocabularium Kindfiche',
        'Zonder AP/VOC': 'Kindfiche',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Welzijn',
      },
      {
        title: 'Vocabularium Kwaliteit Wegen en Wegmarkeringen',
        'Zonder AP/VOC': 'Kwaliteit Wegen en Wegmarkeringen',
        organization: 'stad Roeselare',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002220',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium LDES',
        'Zonder AP/VOC': 'LDES',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Leercredential',
        'Zonder AP/VOC': 'Leercredential',
        organization: 'Athumi',
        'Organization Reference':
          'https://data.vlaanderen.be/doc/organisatie/OVO051320',
        domain: 'Onderwijs',
      },
      {
        title: 'Vocabularium Lokale Economie',
        'Zonder AP/VOC': 'Lokale Economie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Economie',
      },
      {
        title: 'Vocabularium loongegevens',
        'Zonder AP/VOC': 'loongegevens',
        organization: 'Agentschap Uitbetaling Groeipakket',
        'Organization Reference':
          'https://data.vlaanderen.be/doc/organisatie/OVO008643',
        domain: 'Financiën',
      },
      {
        title: 'Vocabularium Mandaat',
        'Zonder AP/VOC': 'Mandaat',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Melding',
        'Zonder AP/VOC': 'Melding',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium metadata DCAT',
        'Zonder AP/VOC': 'metadata DCAT',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Mobiliteit',
        'Zonder AP/VOC': 'Mobiliteit',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Mobiliteit Trips en Aanbod',
        'Zonder AP/VOC': 'Mobiliteit Trips en Aanbod',
        organization: 'Departement Mobiliteit en Openbare Werken',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000096',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Mobiliteit: Dienstregeling en Planning',
        'Zonder AP/VOC': 'Mobiliteit: Dienstregeling en Planning',
        organization: 'De Lijn',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO000100',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Mobiliteit: Intelligente Toegang',
        'Zonder AP/VOC': 'Mobiliteit: Intelligente Toegang',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Mobiliteitsbudget',
        'Zonder AP/VOC': 'Mobiliteitsbudget',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Netwerk',
        'Zonder AP/VOC': 'Netwerk',
        organization: 'Departement Mobiliteit en Openbare Werken',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000096',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Notificatie',
        'Zonder AP/VOC': 'Notificatie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Nutsvoorzieningen',
        'Zonder AP/VOC': 'Nutsvoorzieningen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Nutsvoorzieningen Meters',
        'Zonder AP/VOC': 'Nutsvoorzieningen Meters',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Observaties en Metingen',
        'Zonder AP/VOC': 'Observaties en Metingen',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Omgevingsvergunning',
        'Zonder AP/VOC': 'Omgevingsvergunning',
        organization: 'Departement Omgeving',
        'Organization Reference':
          'https://data.vlaanderen.be/doc/organisatie/OVO003323',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Organisatie',
        'Zonder AP/VOC': 'Organisatie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium OSLO Datakwaliteit',
        'Zonder AP/VOC': 'OSLO Datakwaliteit',
        organization: 'Vlaamse Milieumaatschappij (VMM)',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000092',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium OSLO Slimme Stadsdistributie',
        'Zonder AP/VOC': 'OSLO Slimme Stadsdistributie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium OSLO Statistiek',
        'Zonder AP/VOC': 'OSLO Statistiek',
        organization: 'Vlaamse Milieumaatschappij (VMM)',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000092',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium OSLO Waterkwaliteit',
        'Zonder AP/VOC': 'OSLO Waterkwaliteit',
        organization: 'Vlaamse Milieumaatschappij (VMM)',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000092',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Overlijdensaangifte',
        'Zonder AP/VOC': 'Overlijdensaangifte',
        organization: 'Athumi',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO051320',
        domain: 'Welzijn',
      },
      {
        title: 'Vocabularium Passenger Transport Hubs',
        'Zonder AP/VOC': 'Passenger Transport Hubs',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Perceel',
        'Zonder AP/VOC': 'Perceel',
        organization: 'Agentschap Innoveren en Ondernemen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000039',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Persoon',
        'Zonder AP/VOC': 'Persoon',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Publicatie-Advertentie',
        'Zonder AP/VOC': 'Publicatie-Advertentie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Cultuur',
      },
      {
        title: 'Vocabularium Ruimtelijke Bereiken',
        'Zonder AP/VOC': 'Ruimtelijke Bereiken',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Ruimtelijke Indicatoren',
        'Zonder AP/VOC': 'Ruimtelijke Indicatoren',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Schuldbeheer',
        'Zonder AP/VOC': 'Schuldbeheer',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Financiën',
      },
      {
        title: 'Vocabularium Sensoren en Bemonstering',
        'Zonder AP/VOC': 'Sensoren en Bemonstering',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Slimme Raadpleegomgeving',
        'Zonder AP/VOC': 'Slimme Raadpleegomgeving',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Wetgeving',
      },
      {
        title: 'Vocabularium Sonderingen',
        'Zonder AP/VOC': 'Sonderingen',
        organization: 'Databank Ondergrond Vlaanderen en OVAM',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO027735',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Subsidies',
        'Zonder AP/VOC': 'Subsidies',
        organization: 'Agentschap Binnenlands Bestuur',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO001835',
        domain: 'Financiën',
      },
      {
        title: 'Vocabularium Toeristische Logies',
        'Zonder AP/VOC': 'Toeristische Logies',
        organization: 'Toerisme Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000034',
        domain: 'Cultuur',
      },
      {
        title: 'Vocabularium Toestemming',
        'Zonder AP/VOC': 'Toestemming',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Transactie',
        'Zonder AP/VOC': 'Transactie',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Generiek',
      },
      {
        title: 'Vocabularium Transportnetwerk',
        'Zonder AP/VOC': 'Transportnetwerk',
        organization: 'Departement Mobiliteit en Openbare Werken',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000096',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Vastgoed',
        'Zonder AP/VOC': 'Vastgoed',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'http://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Omgeving',
      },
      {
        title: 'Vocabularium Verkeersmetingen',
        'Zonder AP/VOC': 'Verkeersmetingen',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Vervoersknooppunten',
        'Zonder AP/VOC': 'Vervoersknooppunten',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Vrachtwagenparkeren',
        'Zonder AP/VOC': 'Vrachtwagenparkeren',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'Vocabularium Weg',
        'Zonder AP/VOC': 'Weg',
        organization: 'Agentschap Digitaal Vlaanderen',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO002949',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel AIM Object',
        'Zonder AP/VOC': 'implementatiemodel AIM Object',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel ANPR en trajectcontrole',
        'Zonder AP/VOC': 'implementatiemodel ANPR en trajectcontrole',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Brandleiding',
        'Zonder AP/VOC': 'implementatiemodel Brandleiding',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Camerainstallatie',
        'Zonder AP/VOC': 'implementatiemodel Camerainstallatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Complexe datatypes',
        'Zonder AP/VOC': 'implementatiemodel Complexe datatypes',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Draagconstructies',
        'Zonder AP/VOC': 'implementatiemodel Draagconstructies',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Dynamische borden',
        'Zonder AP/VOC': 'implementatiemodel Dynamische borden',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Ecologische maatregelen',
        'Zonder AP/VOC': 'implementatiemodel Ecologische maatregelen',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Eenvoudige datatypes',
        'Zonder AP/VOC': 'implementatiemodel Eenvoudige datatypes',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Elektrische componenten',
        'Zonder AP/VOC': 'implementatiemodel Elektrische componenten',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Fietstelinstallatie',
        'Zonder AP/VOC': 'implementatiemodel Fietstelinstallatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Hulpposten',
        'Zonder AP/VOC': 'implementatiemodel Hulpposten',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Inbreuken zwaar vervoer',
        'Zonder AP/VOC': 'implementatiemodel Inbreuken zwaar vervoer',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Kasten, cabines, behuizing',
        'Zonder AP/VOC': 'implementatiemodel Kasten, cabines, behuizing',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Lijnvormige elementen',
        'Zonder AP/VOC': 'implementatiemodel Lijnvormige elementen',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Luchtkwaliteit',
        'Zonder AP/VOC': 'implementatiemodel Luchtkwaliteit',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Luidsprekers en intercom',
        'Zonder AP/VOC': 'implementatiemodel Luidsprekers en intercom',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Master-implementatiemodel',
        'Zonder AP/VOC': 'implementatiemodel Master-implementatiemodel',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Meten in Vlaanderen',
        'Zonder AP/VOC': 'implementatiemodel Meten in Vlaanderen',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Optisch transport netwerk',
        'Zonder AP/VOC': 'implementatiemodel Optisch transport netwerk',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Proeven en metingen',
        'Zonder AP/VOC': 'implementatiemodel Proeven en metingen',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Relaties',
        'Zonder AP/VOC': 'implementatiemodel Relaties',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Riolering',
        'Zonder AP/VOC': 'implementatiemodel Riolering',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Signalisatie',
        'Zonder AP/VOC': 'implementatiemodel Signalisatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Slagbomen en doorsteken',
        'Zonder AP/VOC': 'implementatiemodel Slagbomen en doorsteken',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Software en hardware',
        'Zonder AP/VOC': 'implementatiemodel Software en hardware',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Tunnelevacuatie',
        'Zonder AP/VOC': 'implementatiemodel Tunnelevacuatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Union datatypes',
        'Zonder AP/VOC': 'implementatiemodel Union datatypes',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Vegetatie',
        'Zonder AP/VOC': 'implementatiemodel Vegetatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Ventilatie',
        'Zonder AP/VOC': 'implementatiemodel Ventilatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Verharding en wegfundering',
        'Zonder AP/VOC': 'implementatiemodel Verharding en wegfundering',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Verkeersregelinstallatie',
        'Zonder AP/VOC': 'implementatiemodel Verkeersregelinstallatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Verlichtingsinstallatie',
        'Zonder AP/VOC': 'implementatiemodel Verlichtingsinstallatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer implementatiemodel Zone 30',
        'Zonder AP/VOC': 'implementatiemodel Zone 30',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer vocabularium abstracten',
        'Zonder AP/VOC': 'vocabularium abstracten',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer vocabularium implementatieelementen',
        'Zonder AP/VOC': 'vocabularium implementatieelementen',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer vocabularium installatie',
        'Zonder AP/VOC': 'vocabularium installatie',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer vocabularium levenscyclus',
        'Zonder AP/VOC': 'vocabularium levenscyclus',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer vocabularium onderdeel',
        'Zonder AP/VOC': 'vocabularium onderdeel',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
      {
        title: 'wegenenverkeer vocabularium proefenmeting',
        'Zonder AP/VOC': 'vocabularium proefenmeting',
        organization: 'Agentschap Wegen en Verkeer',
        'Organization Reference':
          'https://data.vlaanderen.be/id/organisatie/OVO000098',
        domain: 'Mobiliteit',
      },
    ]
    const width = 1200
    const height = 800

    const svg = d3
      .select(graph.value)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')

    // Transform the data into nodes and links
    const nodes = []
    const links = []

    data.forEach((item) => {
      nodes.push({ id: item.title, group: 'title', domain: item.domain })
      nodes.push({ id: item.organization, group: 'organization' })
      links.push({
        source: item.title,
        target: item.organization,
        domain: item.domain,
      })
    })

    const uniqueNodes = Array.from(new Set(nodes.map((node) => node.id))).map(
      (id) => {
        return nodes.find((node) => node.id === id)
      },
    )

    // Create a color scale for domains
    const colorScaleDomain = d3.scaleOrdinal(d3.schemeCategory10)
    const domains = Array.from(new Set(data.map((item) => item.domain)))
    colorScaleDomain.domain(domains)

    // Create a color scale for domains
    const colorScaleOrg = d3.scaleOrdinal(d3.schemeSet3)
    const organizations = Array.from(
      new Set(data.map((item) => item.organization)),
    )
    colorScaleOrg.domain(organizations)

    const simulation = d3
      .forceSimulation(uniqueNodes)
      .force('charge', d3.forceManyBody().strength(-50)) // Increase the repulsion strength
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(80),
      )
      .force('center', d3.forceCenter(width / 3, height / 2))
      .force(
        'x',
        d3.forceX().x((d) => {
          return width / 2 + ((domains.indexOf(d.domain) % 4) - 1) * 100 // Increase the spacing between groups
        }),
      )
      .force(
        'y',
        d3.forceY().y((d) => {
          return (
            height / 2 + (Math.floor(domains.indexOf(d.domain) / 4) - 1) * 30
          )
        }),
      )

    const link = svg
      .append('g')
      .attr('class', 'links')
      .attr('stroke', 'gray')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1.5)

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .selectAll('circle')
      .data(uniqueNodes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('fill', (d) => {
        if (d.group === 'organization') {
          return colorScaleOrg(d.id)
        }
        if (d.group === 'title') {
          return colorScaleDomain(d.domain)
        }
      })
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )

    const labels = svg
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(uniqueNodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', '50%')
      .attr('dy', '3%')
      .attr('text-anchor', 'middle')
      .text((d) => `${d.id} ${d.domain ? `- ${d.domain}` : ''}`)
      .style('visibility', 'hidden')

    node.on('mouseover', function (event, d) {
      labels.filter((label) => label.id === d.id).style('visibility', 'visible')
    })

    node.on('mouseleave', function (event, d) {
      labels.filter((label) => label.id === d.id).style('visibility', 'hidden')
    })

    node.append('title').text((d) => d.id)

    simulation.nodes(uniqueNodes).on('tick', ticked)
    simulation.force('link').links(links)

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('font-size', '1.6rem')
      .attr('transform', `translate(${width - 300}, 100)`)

    // Add domain legend
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text('Domains')
      .style('font-weight', 'bold')

    domains.forEach((domain, i) => {
      const legendRow = legend
        .append('g')
        .attr('transform', `translate(0, ${20 + i * 20})`)

      legendRow
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', colorScaleDomain(domain))

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 5)
        .attr('font-size', '1.6rem')
        .attr('dy', '0.35em')
        .text(domain)
    })

    // Add organization legend
    const orgLegend = legend
      .append('g')
      .attr('transform', `translate(0, ${20 + domains.length * 20 + 20})`)

    orgLegend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text('Organizations')
      .style('font-weight', 'bold')

    organizations.forEach((org, i) => {
      const legendRow = orgLegend
        .append('g')
        .attr('transform', `translate(0, ${20 + i * 20})`)

      legendRow
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', colorScaleOrg(org))

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 5)
        .attr('dy', '0.35em')
        .text(org)
    })
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
.knowledge-graph {
  width: 100%;
  height: 80rem;
  display: flex;
  justify-content: center;
}

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}

.label {
  font: 1rem sans-serif;
  text-anchor: middle;
}
</style>
