import { FilterType, type FilterOption } from '~/types/custom-filter'

let defaultFilters: FilterOption[] = [
    {
        type: FilterType.CHECKBOX,
        title: 'Type toepassing',
        key: 'usageType',
        active: [false, false, false, false],
        options: [
            {
                default: true,
                label: 'Verplicht',
                key: 'Verplicht',
            },
            {
                default: false,
                label: 'Aanbevolen (vrijwillig)',
                key: 'Aanbevolen (vrijwillig)',
            },
            {
                default: false,
                label: 'TBD',
                key: 'TBD',
            },
            {
                default: false,
                label: 'Pas toe of leg uit',
                key: 'Pas toe of leg uit',
            },
        ],
    },
    {
        type: FilterType.RADIO,
        title: 'Type standaard',
        key: 'category',
        active: '',
        options: [
            {
                default: '1',
                key: 'Vocabularium',
                label: 'Vocabularium',
            },
            {
                default: '2',
                key: 'Applicatieprofiel',
                label: 'Applicatieprofiel',
            },
            {
                default: '3',
                key: 'Implementatiemodel',
                label: 'Implementatiemodel',
            },
            {
                default: '4',
                key: 'All',
                label: 'Toon alle standaarden',
            },
        ],
    },
]

export default defaultFilters;