export const useCapitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useRemoveDashes = (string: string) => {
    return string.replace(/-/g, ' ');
}
