import {Dayjs} from 'dayjs'

export const getFormattedDateRange = (from: Dayjs, to: Dayjs): string => {
  if (from.format('DD/MM/YYYY') === to.format('DD/MM/YYYY')) return to.format('DD/MM/YYYY')
  if (from.format('MM/YYYY') === to.format('MM/YYYY')) return `${from.format('DD')}-${to.format('DD/MM/YYYY')}`
  if (from.format('YYYY') === to.format('YYYY')) return `${from.format('DD/MM')}-${to.format('DD/MM/YYYY')}`

  return `${from.format('DD/MM/YYYY')}-${to.format('DD/MM/YYYY')}`
}
