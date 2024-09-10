export const useCapitalizeFirstLetter = (string: string) => {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } catch (err) {
    console.error(err)
    return string
  }
}

export const useRemoveDashes = (string: string) => {
  try {
    return string.replace(/-/g, ' ')
  } catch (err) {
    console.error(err)
    return string
  }
}
