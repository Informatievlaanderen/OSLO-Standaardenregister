export const normalizeDate = (date: string | undefined): string => {
  if (!date) {
    return ''
  }

  // Trim whitespace and check for empty string
  const trimmedDate = date.trim()
  if (trimmedDate === '') {
    return ''
  }

  if (trimmedDate === 'TBD' || trimmedDate === 'TDB') {
    return 'TBD'
  }

  if (trimmedDate.includes('(retroactief)')) {
    // Remove the '(retroactief)' part if it exists
    const retroactiveIndex = trimmedDate.indexOf('(retroactief)')
    return trimmedDate.substring(0, retroactiveIndex).trim()
  }

  // Return the trimmed date
  return trimmedDate
}

export const isValidDate = (date: string): boolean => {
  // Check if the date is a valid date string
  return (
    !isNaN(Date.parse(date)) &&
    !!date?.length &&
    date !== 'TBD' &&
    date !== 'N.v.t.' &&
    date !== 'TDB'
  )
}
