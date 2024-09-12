export const useCapitalizeFirstLetter = (string: string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } catch (err) {
    // unable to capitalize first letter, return the original string
    return string
  }
}

export const useRemoveDashes = (string: string) => {
  try {
    return string.replace(/-/g, ' ')
  } catch (err) {
    // unable to remove dashes, return the original string
    return string
  }
}
