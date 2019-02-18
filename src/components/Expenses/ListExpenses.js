import React, { Component } from 'react'
import './expenses.css'
import { Link } from 'react-router-dom'
import AddCircle from '@material-ui/icons/AddCircle'

export default class ListExpenses extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      expenses: []
    }
  }

  calculateTotal () {
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

        this.getExpenses(currentUser)
      })
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
        <div class='container marginlist'>
          <div class='row' />
          <div class='jumbotron'>
            <div class='row'>
              <div class='col-md-6 text-center'>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-12 colorRed '>
                      Expenses $ {this.calculateTotal()}.00
                      <div className='btnAdd'>
                        <Link to='/reminders'>
                          <AddCircle />
                        </Link>
                        <div>
                          <span>Add Expenses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table class='table'>
            <thead class='thead-dark'>
              <tr>
                <th scope='col'>Pagado</th>
                <th scope='col'>Concept</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.expenses.map(expense => (
                <tr>
                  <td>
                    <input
                      className='form-check-input inputExp'
                      type='checkbox'
                      value=''
                      id='defaultCheck1'
                    />
                  </td>
                  <td>{expense.concept}</td>
                  <td>{expense.quantity}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}
