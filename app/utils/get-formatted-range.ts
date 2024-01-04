export const getFormattedRange = (from: number, to: number): string => {
  return from === to ? from.toString() : `${from} - ${to}`
}
