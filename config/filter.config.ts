import { ALL } from '~/constants/constants'
import { FilterType, type FilterOption } from '~/types/custom-filter'
import {
  Category,
  getCategoryTranslation,
  getStatusTranslation,
  getUsageTranslation,
  Status,
  Usage,
} from '~/types/standard'

export const getDefaultFilters = (translate: Function): FilterOption[] => {
  console.log(translate(Usage.MANDATORY))
  return [
    {
      type: FilterType.CHECKBOX,
      title: translate('typeOfApplication'),
      key: 'usage',
      active: [false, false, false, false],
      options: [
        {
          default: false,
          label: getUsageTranslation(Usage.MANDATORY, translate),
          key: Usage.MANDATORY,
        },
        {
          default: false,
          label: getUsageTranslation(Usage.RECOMMENDED, translate),
          key: Usage.RECOMMENDED,
        },
        {
          default: false,
          label: getUsageTranslation(Usage.APPLY_OR_EXPLAIN, translate),
          key: Usage.APPLY_OR_EXPLAIN,
        },
        {
          default: false,
          label: getUsageTranslation(Usage.TBD, translate),
          key: Usage.TBD,
        },
      ],
    },
    {
      modal: {
        title: translate('statusStandard'),
        content: translate('content.overview.statusStandard'),
      },
      type: FilterType.CHECKBOX,
      title: translate('statusStandard'),
      key: 'status',
      active: [false, false, false],
      options: [
        {
          default: false,
          label: useRemoveDashes(
            useCapitalizeFirstLetter(
              getStatusTranslation(Status.DEVELOPMENT, translate),
            ),
          ),
          key: Status.DEVELOPMENT,
        },
        {
          default: false,
          label: useRemoveDashes(
            useCapitalizeFirstLetter(
              getStatusTranslation(Status.CANDIDATE, translate),
            ),
          ),
          key: Status.CANDIDATE,
        },
        {
          default: false,
          label: useRemoveDashes(
            useCapitalizeFirstLetter(
              getStatusTranslation(Status.RECOGNIZED, translate),
            ),
          ),
          key: Status.RECOGNIZED,
        },
      ],
    },
    {
      modal: {
        title: translate('categoryStandard'),
        content: translate('content.overview.categoryStandard'),
      },
      type: FilterType.RADIO,
      title: translate('categoryStandard'),
      key: 'category',
      active: '',
      options: [
        {
          default: '1',
          key: Category.VOCABULARY,
          label: getCategoryTranslation(Category.VOCABULARY, translate),
        },
        {
          default: '2',
          key: Category.APPLICATION_PROFILE,
          label: getCategoryTranslation(
            Category.APPLICATION_PROFILE,
            translate,
          ),
        },
        {
          default: '3',
          key: Category.IMPLEMENTATION_MODEL,
          label: getCategoryTranslation(
            Category.IMPLEMENTATION_MODEL,
            translate,
          ),
        },
        {
          default: '4',
          key: ALL,
          label: 'Toon alle standaarden',
        },
      ],
    },
  ]
}
