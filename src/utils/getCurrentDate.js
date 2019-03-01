const getCurrentDate = () => {
  const { expensesData } = this.state
  let aaaa = expensesData.date.getFullYear()
  let gg = expensesData.date.getDate()
  let mm = expensesData.date.getMonth() + 1

  if (gg < 10) gg = '0' + gg

  if (mm < 10) mm = '0' + mm

  let cur_day = aaaa + '-' + mm + '-' + gg

  return cur_day
}
