export const parseDate = (datetime: string): Date | null => {
  if (!datetime) return null

  let date = new Date(datetime)
  if (!isNaN(date.getTime())) return date

  const [datePart, timePart] = datetime.split(' ')
  const [day, month, year] = datePart.split('.')
  date = new Date(`${year}-${month}-${day}T${timePart ?? '00:00'}:00`)
  if (!isNaN(date.getTime())) return date

  return null
}

export const formatDate = (datetime: string): string => {
  const date = parseDate(datetime)
  if (!date) return datetime
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}