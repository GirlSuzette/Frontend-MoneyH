import React, { Component } from 'react'
import './Income.css'
import { Link } from 'react-router-dom'
import AddCircle from '@material-ui/icons/AddCircle'
import Moment from 'react-moment'

export default class ListIncomes extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      incomes: []
    }
  }

  calculateTotal () {
    const prices = this.state.incomes.map(p => p.quantity)
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

  render () {
    return (
      <React.Fragment>
        <div class='container marginlist'>
          <div class='row' />
          <div class='jumbotron'>
            <div class='row'>
              <div class='col-md-6 text-center'>
                <div className='form-group'>
                  <div>
                    <div class='col-12 colorGreen '>
                      Income ${' '}
                      {this.calculateTotal()
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='btnAddInc'>
              <Link to='/reminders'>
                <AddCircle />
              </Link>
              <div className='textAdd'>
                <span>Add Income</span>
              </div>
            </div>
          </div>
          <table class='table'>
            <thead class='thead-dark'>
              <tr>
                <th scope='col'>Concept</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.incomes.map(expense => (
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
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}
