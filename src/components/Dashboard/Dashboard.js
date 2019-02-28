import React, { Component } from 'react'
import './dashboard.css'
import DashIncome from './DashIncome'
import DashExpense from './DashExpense'
import { Bar } from 'react-chartjs-2'
import addCommas from '../../utils/addComas'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      local: '',
      balance: '',
      incomes: '',
      expenses: '',
      dataBalan: [],
      period: '',
      expensesData: [],

    }
  }



  componentDidMount() {
    this.getBalance()
    this.getExpenses()

  }

  getBalance = () => {
    const userId = this.props.data._id
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

  getExpenses = () => {
    const userId = this.props.data._id
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



  render() {
    const { incomes, expenses, balance, period } = this.state
    // console.log(this.state.expensesData)
    const data = {
      labels: [`Ingresos ${period}`, `Gastos ${period}`, `Balance ${period}`,],
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
          <h5 className='textDash'>Información General {period} </h5>
          <div class='jumbotron'>
            <div class='row centerBal '>
              <div className='form-group'>
                <div class='row'>
                  <div class='col-8 colorGreen'>Ingresos</div>
                  <div class='col-8 colorGreen'>${addCommas(incomes)}</div>
                </div>
              </div>
              <div className='form-group'>
                <div class='row'>
                  <div class='col-8 colorRed'>Gastos</div>
                  <div class='col-8 colorRed'>$ {addCommas(expenses)}</div>
                </div>
              </div>

              <div className='form-group'>
                <div class='row'>
                  <div class='col-8 colorPur'>Balance</div>
                  <div class='col-8 colorPur'>$ {addCommas(balance)}</div>
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
