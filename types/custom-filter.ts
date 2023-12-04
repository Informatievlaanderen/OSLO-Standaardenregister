export interface FilterOption {
    type: FilterType,
    title?: string,
    key: string,
    active: Array<string | boolean> | string,
    options: FilterValue[],
}

export enum FilterType {
    RADIO = "radio",
    CHECKBOX = "checkbox",
}

export interface FilterValue {
    default: string | boolean,
    label: string,
    key: string,
}

export interface SanitizedFilter {
    [key: string]: Array<string>,
}
