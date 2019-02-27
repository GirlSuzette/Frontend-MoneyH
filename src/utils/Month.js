const getMonth = () => {
  const date = new Date()

  const month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'September',
    'October',
    'November',
    'December'
  ]

  return month[date.getDay() - 1]
}

module.exports = getMonth
