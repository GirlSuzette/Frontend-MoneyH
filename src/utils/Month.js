const getMonth = () => {
  const date = new Date()

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return month[date.getDay() - 1]
}

module.exports = getMonth
