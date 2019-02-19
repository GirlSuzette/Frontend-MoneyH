import React, { Component } from 'react'
import './dashboard.css'
import imgGraf from '../../image/chartjs.png'

export default class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      incomes: [],
      expenses: []
    }
  }

  calculateTotalInc () {
    const prices = this.state.incomes.map(p => p.quantity)
    return prices.reduce((a, b) => a + b, 0)
  }

  calculateTotalExp () {
    const prices = this.state.expenses.map(p => p.quantity)
    return prices.reduce((a, b) => a + b, 0)
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

        this.getIncomes(currentUser)
        this.getExpenses(currentUser)
      })
  }

  getIncomes = currentUser => {
    // console.log(currentUser)
    const userId = currentUser[0]._id
    console.log(userId)
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/incomes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          incomes: data.data
        })
      })
      .catch(e => alert(e))
  }
  getExpenses = currentUser => {
    // console.log(currentUser)
    const userId = currentUser[0]._id
    console.log(userId)
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/expenses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          expenses: data.data
        })
      })
      .catch(e => alert(e))
  }

  render () {
    return (
      <React.Fragment>
        <div class='container marginDash'>
          <div class='row' />
          <h5 className='textDash'>General information </h5>
          <div class='jumbotron'>
            <div class='row'>
              <div class='col-md-6'>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-6 colorGreen'>Incomes</div>
                    <div class='col-6 colorGreen'>
                      $
                      {this.calculateTotalInc()
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-6 colorRed'>Expenses</div>
                    <div class='col-6 colorRed'>
                      ${' '}
                      {this.calculateTotalExp()
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-md-5'>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-6 colorBlue'>Saving Goal</div>
                    <div class='col-6 colorBlue'>
                      $10,0000.00/
                      <br />
                      $45,000.00
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-6 colorPur'>In General account</div>
                    <div class='col-6 colorPur'>
                      ${' '}
                      {(this.calculateTotalInc() - this.calculateTotalExp())
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='row'>
            <div class='col-md-6'>
              <h2 class='jumbotron text-center colorGreen'> Incomes </h2>
              <img class='img-responsive' src={imgGraf} alt='graf' />
            </div>
            <div class='col-md-6'>
              <h2 class='jumbotron text-center colorRed'> Expenses </h2>
              <img class='img-responsive' src={imgGraf} alt='graf' />
            </div>
            <div class='col-md-6 colorBlue'>
              <h2 class='jumbotron text-center colorBlue'>
                {' '}
                Graphs for expenses{' '}
              </h2>
              <img class='img-responsive' src={imgGraf} alt='graf' />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
