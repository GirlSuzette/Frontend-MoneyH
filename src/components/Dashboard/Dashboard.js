import React, { Component } from 'react'
import './dashboard.css'
import DashIncome from './DashIncome'
import DashExpense from './DashExpense'
import { Bar } from 'react-chartjs-2'

export default class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      balance: [],
      incomes: [],
      expenses: [],
      dataBalan: [],
      period: '',
      expensesData: [],
      showAño: true,
      showMes: false
    }
  }

  info = e => {
    this.setState({
      showAño: !this.state.showLogin,
      showMes: !this.state.showRecord
    })
  }

  onSubmitHandle = e => {
    e.preventDefault()
    this.setState({
      showAño: !this.state.showAño
    })
  }

  componentDidMount () {
    fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        this.setState({
          users: data.data
        })

        const token = localStorage.getItem('token')
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        const t = JSON.parse(window.atob(base64))
        // console.log(t.email)
        const currentUser = data.data.filter(user => {
          if (user.email === t.email) {
            this.setState({ user: user })
            return user
          }
        })

        this.getBalance(currentUser)
        this.getExpenses(currentUser)
      })
  }

  getBalance = currentUser => {
    // console.log(currentUser)
    const userId = currentUser[0]._id
    // console.log(userId)
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/balances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          balance: data.data[0].balance,
          incomes: data.data[0].incomes,
          expenses: data.data[0].expenses,
          period: data.data[0].period,
          dataBalan: data.data
        })
      })
      .catch(e => alert(e))
  }

  getExpenses = currentUser => {
    // console.log(currentUser)
    const userId = currentUser[0]._id
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        this.setState({
          expensesData: data.data
        })
      })
      .catch(e => alert(e))
  }

  getMonth = () => {
    const getData = this.state.expensesData.map(exp => {
      const newdate = exp.date
      const d = newdate.replace(/T/g, '-')
      const y = d.split('-')
      const newData = y[0] + '-' + y[2]
      // console.log(x)
      return newData
    })
    return getData
  }

  render () {
    const { incomes, expenses, balance, period } = this.state
    console.log(this.state.expensesData)
    const data = {
      labels: ['Incomes 02-2019', 'Expenses 02-2019', 'Balance 02-2019'],
      datasets: [
        {
          label: '# Balance',
          data: [incomes, expenses, balance],
          backgroundColor: [
            'rgba(74, 199, 32, 0.3)',
            'rgba(255, 2, 2, 0.3)',
            'rgba(153, 102, 225, .4)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(255, 9, 131, 1)',
            'rgba(255, 2, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }

    const options = {
      duration: 12000,
      title: {
        display: true,
        text: 'Balance',
        fontSize: 20
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }

    return (
      <React.Fragment>
        <div class='container marginDash'>
          <div class='row' />
          <h5 className='textDash'>General information {period} </h5>
          <div class='jumbotron'>
            <div class='row centerBal '>
              <div className='form-group'>
                <div class='row'>
                  <div class='col-8 colorGreen'>Income</div>
                  <div class='col-8 colorGreen'>${incomes}</div>
                </div>
              </div>
              <div className='form-group'>
                <div class='row'>
                  <div class='col-8 colorRed'>Expenses</div>
                  <div class='col-8 colorRed'>$ {expenses}</div>
                </div>
              </div>

              <div className='form-group'>
                <div class='row'>
                  <div class='col-8 colorPur'>Balance</div>
                  <div class='col-8 colorPur'>$ {balance}</div>
                </div>
              </div>
            </div>
          </div>
          <div class='row'>
            <div class='col-md-12'>
              <div>
                <Bar data={data} width={100} height={450} options={options} />
              </div>
            </div>
            <div class='col-md-6'>
              <div>
                <DashIncome />
              </div>
            </div>
            <div class='col-md-6 '>
              <div>
                <DashExpense />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
