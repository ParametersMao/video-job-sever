export function getLocalISOString() {
  const now = new Date()
  // getTimezoneOffset returns in minutes, so convert it to milliseconds for date manipulation
  const timezoneOffsetInMs = now.getTimezoneOffset() * 60 * 1000

  // Adjust the date based on the timezone offset
  now.setTime(now.getTime() - timezoneOffsetInMs)

  // Convert to the desired format
  return now.toISOString().slice(0, 19).replace('T', ' ')
}

export function getWeekDayName(day) {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekDays[day]
}
