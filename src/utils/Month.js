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

  return month[date.getDay() - 3]
}

module.exports = getMonth
