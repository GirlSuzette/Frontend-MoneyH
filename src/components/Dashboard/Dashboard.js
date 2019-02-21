import React, { Component } from 'react'
import './dashboard.css'
import Moment from 'react-moment'
import Button from '@material-ui/core/Button'
import DashIncome from './DashIncome'
import DashExpense from './DashExpense'
import DashSaving from './DashSaving'
import { getMonth } from 'date-fns/esm/fp'
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
  // onSubmit = e => {
  //   e.preventDefault()
  //   // console.log(e.target.month.value)

  //   const x = this.state.expensesData.filter(exp => {
  //     if (this.getMonth(exp.date) === e.target.month.value) {
  //       return exp
  //     }
  //   })
  //   this.setState({
  //     expensesData: x
  //   })
  //   console.log(this.state.expensesData)
  // }

  render () {
    const { incomes, expenses, balance, period } = this.state
    console.log(this.state.expensesData)

    return (
      <React.Fragment>
        <div className='centerSelect'>
          <div class='row'>
            <div>
              {/* <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <div class='col-12'>
                    <select
                      name='month'
                      className='browser-default custom-select selectMonth'
                    >
                      <option value=''>Choose your Month</option>
                      <option value='01'>January</option>
                      <option value='02'>February</option>
                      <option value='03'>Marth</option>
                    </select>
                  </div>
                </div>
                <div className='form-group col-4'>
                  <Button type='submit' variant='contained'>
                    search
                  </Button>
                </div>
              </form> */}
              <div />
            </div>
          </div>
        </div>

        {this.state.showAño && (
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
              <div class='col-md-6'>
                <div>
                  <DashIncome />
                </div>
              </div>
              <div class='col-md-6'>
                <div>
                  <DashExpense />
                </div>
              </div>
              <div class='col-md-6 colorBlue'>
                <div>
                  <DashSaving />
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.showMes && (
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
                  {this.state.expensesData.map(expense => (
                    <tr>
                      <td>{expense.concept}</td>
                      <td>
                        {'$ ' +
                          expense.quantity
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </td>
                      <td>
                        <Moment format='YYYY-MM-DD'>{expense.date}</Moment>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
