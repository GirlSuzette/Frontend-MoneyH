import React, { Component } from 'react'
import './dashboard.css'
import getMonth from '../../utils/Month'
import Moment from 'react-moment'

export default class DashMonth extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      balance: [],
      incomes: [],
      expenses: [],
      dataBalan: [],
      period: ''
    }
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

  render () {
    const { incomes, expenses, balance, period } = this.state
    const data = {
      labels: [...getMonth(period)],
      datasets: [
        {
          label: '# of Votes',
          data: [incomes],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }

    const options = {
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
            <div class='row'>
              <div class='col-md-6'>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-6 colorGreen'>Incomes</div>
                    <div class='col-6 colorGreen'>${incomes}</div>
                  </div>
                </div>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-6 colorRed'>Expenses</div>
                    <div class='col-6 colorRed'>$ {expenses}</div>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div class='row'>
                  <div class='col-6 colorPur'>Balance</div>
                  <div class='col-6 colorPur'>$ {balance}</div>
                </div>
              </div>
            </div>
          </div>
          <div class='row'>
            <table class='table'>
              <thead class='thead-dark'>
                <tr>
                  <th scope='col'>Concept</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.state.expenses.map(expense => (
                  <tr>
                    <td>{expense.concept}</td>
                    <td>
                      {'$ ' +
                        expense.quantity
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </td>
                    <td>
                      <Moment format='YYYY/MM/DD'>{expense.date}</Moment>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
