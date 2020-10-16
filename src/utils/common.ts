import dayjs from 'dayjs'

export function parseDate2Str (date: Date, format: string | void): string {
  format = format || 'YYYY-MM-DD hh:mm:ss'
  return dayjs(date).format(format)
}
