import {
  ALL,
  IMPLEMENTATION_MODEL_DESCRIPTION,
  RECOGNIZED_DESCRIPTION,
} from '~/constants/constants'
import { FilterType, type FilterOption } from '~/types/custom-filter'
import { Category, Status, Usage } from '~/types/standard'

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
      content: RECOGNIZED_DESCRIPTION,
    },
    type: FilterType.CHECKBOX,
    title: 'Status standaard',
    key: 'status',
    active: [false, false, false],
    options: [
      {
        default: false,
        label: useRemoveDashes(useCapitalizeFirstLetter(Status.DEVELOPMENT)),
        key: Status.DEVELOPMENT,
      },
      {
        default: false,
        label: useRemoveDashes(useCapitalizeFirstLetter(Status.CANDIDATE)),
        key: Status.CANDIDATE,
      },
      {
        default: false,
        label: useRemoveDashes(useCapitalizeFirstLetter(Status.RECOGNIZED)),
        key: Status.RECOGNIZED,
      },
    ],
  },
  {
    modal: {
      title: 'Categorie standaard',
      content: IMPLEMENTATION_MODEL_DESCRIPTION,
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
