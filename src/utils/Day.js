const getDay = () => {
  const date = new Date()

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  return days[date.getDay()]
}

module.exports = getDay
