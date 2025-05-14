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
          key: getUsageTranslation(Usage.MANDATORY, translate),
        },
        {
          default: false,
          label: getUsageTranslation(Usage.RECOMMENDED, translate),
          key: getUsageTranslation(Usage.RECOMMENDED, translate),
        },
        {
          default: false,
          label: getUsageTranslation(Usage.APPLY_OR_EXPLAIN, translate),
          key: getUsageTranslation(Usage.APPLY_OR_EXPLAIN, translate),
        },
        {
          default: false,
          label: getUsageTranslation(Usage.TBD, translate),
          key: getUsageTranslation(Usage.TBD, translate),
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
      active: Array(Object.keys(Status).length).fill(false),
      options: Object.values(Status).map((status) => ({
        default: false,
        label: useRemoveDashes(
          useCapitalizeFirstLetter(getStatusTranslation(status, translate)),
        ),
        key: status,
      })),
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
          label: getCategoryTranslation(Category.VOCABULARY, translate),
          key: getCategoryTranslation(Category.VOCABULARY, translate),
        },
        {
          default: '2',
          label: getCategoryTranslation(
            Category.APPLICATION_PROFILE,
            translate,
          ),
          key: getCategoryTranslation(Category.APPLICATION_PROFILE, translate),
        },
        {
          default: '3',
          label: getCategoryTranslation(
            Category.IMPLEMENTATION_MODEL,
            translate,
          ),
          key: getCategoryTranslation(Category.IMPLEMENTATION_MODEL, translate),
        },
        {
          default: '4',
          key: ALL,
          label: translate('showAllStandards'),
        },
      ],
    },
  ]
}
