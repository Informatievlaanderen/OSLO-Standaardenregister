import { useCapitalizeFirstLetter } from '~/composables/useCapitalize';
import { ALL } from '~/constants/constants';
import { FilterType, type FilterOption } from '~/types/custom-filter'
import { Category, State, Usage } from '~/types/standard';

let defaultFilters: FilterOption[] = [
    {
        tooltip: "Het type bepaalt hoe de standaard gebruikt dient te worden.",
        type: FilterType.CHECKBOX,
        title: 'Type toepassing',
        key: 'usageType',
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
        tooltip: "De status waarin een standaard zich bevindt. Erkend betekent...",
        type: FilterType.CHECKBOX,
        title: 'Status standaard',
        key: 'state',
        active: [false, false, false],
        options: [
            {
                default: false,
                label: useCapitalizeFirstLetter(State.DEVELOPMENT),
                key: State.DEVELOPMENT,
            },
            {
                default: false,
                label: useCapitalizeFirstLetter(State.CANDIDATE),
                key: State.CANDIDATE,
            },
            {
                default: false,
                label: useCapitalizeFirstLetter(State.RECOGNIZED),
                key: State.RECOGNIZED,
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

export default defaultFilters;