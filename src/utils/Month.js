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

  return month[date.getDay() - 3]
}

module.exports = getMonth
