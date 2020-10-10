import dayjs from 'dayjs'

export function parseDate2Str (date, format) {
  format = format || 'YYYY-MM-DD'
  return dayjs(date).format(format)
}
