import { ALL } from "~/constants/constants";
import { FilterType, type FilterOption } from "~/types/custom-filter";
import { Category, State, Usage } from "~/types/standard";

export const defaultFilters: FilterOption[] = [
    {
        type: FilterType.CHECKBOX,
        title: 'Type toepassing',
        key: 'usage',
        active: [false, false, false, false],
        options: [
            {
                default: false,
                label: Usage.MANDATORY,
                key: Usage.MANDATORY,
            },
            {
                default: false,
                label: Usage.RECOMMENDED,
                key: Usage.RECOMMENDED,
            },
            {
                default: false,
                label: Usage.APPLY_OR_EXPLAIN,
                key: Usage.APPLY_OR_EXPLAIN,
            },
            {
                default: false,
                label: Usage.TBD,
                key: Usage.TBD,
            },
        ],
    },
    {
        modal: {
            title: 'Status standaard',
            content: "<p>Erkende standaarden: werden na het doorlopen van een erkenningsprocedure goedgekeurd door de Werkgroep Datastandaarden van het Stuurorgaan Vlaams Informatie- en ICT-beleid als standaard binnen de Vlaamse overheid.</p><p>Kandidaat standaarden: een stabiele specificatie voor de standaard werd ontwikkeld, aan de hand van een publieke reviewperiode wordt implementatie-ervaring opgedaan en feedback van buiten de thematische werkgroep verzameld.</p> <p>Standaarden in ontwikkeling: werden reeds aangemeld bij de Werkgroep Datastandaarden en worden uitgewerkt door een thematische werkgroep aan de hand van publieke werksessies.</p>"
        },
        type: FilterType.CHECKBOX,
        title: 'Status standaard',
        key: 'state',
        active: [false, false, false],
        options: [
            {
                default: false,
                label: useRemoveDashes(useCapitalizeFirstLetter(State.DEVELOPMENT)),
                key: State.DEVELOPMENT,
            },
            {
                default: false,
                label: useRemoveDashes(useCapitalizeFirstLetter(State.CANDIDATE)),
                key: State.CANDIDATE,
            },
            {
                default: false,
                label: useRemoveDashes(useCapitalizeFirstLetter(State.RECOGNIZED)),
                key: State.RECOGNIZED,
            },
        ],
    },
    {
        modal: {
            title: 'Categorie standaard',
            content: "<p>Technische standaarden: de technische specificaties voor gegevensuitwisseling, ze bieden manieren aan van gestandaardiseerde gegevensuitwisseling aan.</p> <p>Standaarden voor interoperabiliteit: een stabiele specificatie voor de standaard werd ontwikkeld, aan de hand van een publieke reviewperiode wordt implementatie-ervaring opgedaan en feedback van buiten de thematische werkgroep verzameld.</p> <p>Vocabularium: de basis voor open semantische informatiestandaarden, ze bieden een gedeeld begrippenkader voor bepaalde concepten met een focus op gegevensuitwisseling.</p> <p>Applicatieprofielen: een specificatie voor gegevensuitwisseling voor applicaties die een bepaalde use case vervullen. Het laat toe om naast een gedeelde semantiek ook bijkomende restricties op te leggen, zoals het vastleggen van kardinaliteiten of het gebruik van bepaalde codelijsten.</p> <p>ImplementatieModel: een specificatie voor gegevensuitwisseling voor applicaties die een bepaalde use case vervullen, deze modellen kunnen een deel van de interne gegevensverwerking van specifieke applicaties bevatten. Het laat toe om naast een gedeelde semantiek ook bijkomende restricties op te leggen, zoals het vastleggen van kardinaliteiten of het gebruik van bepaalde codelijsten. De ontwikkeling hiervan volgt dezelfe ideologie als applicatieprofielen en vocabularia, maar heeft nog geen officiele erkenning als proces en methode.</p>"
        },
        type: FilterType.RADIO,
        title: 'Categorie standaard',
        key: 'category',
        active: '',
        options: [
            {
                default: '1',
                key: Category.VOCABULARY,
                label: Category.VOCABULARY,
            },
            {
                default: '2',
                key: Category.APPLICATION_PROFILE,
                label: Category.APPLICATION_PROFILE,
            },
            {
                default: '3',
                key: Category.IMPLEMENTATION_MODEL,
                label: Category.IMPLEMENTATION_MODEL,
            },
            {
                default: '4',
                key: ALL,
                label: 'Toon alle standaarden',
            },
        ],
    },
]