import React, { Component } from 'react'
import './expenses.css'
import Button from '@material-ui/core/Button'

export default class ListExpenses extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      expenses: [],
      expensesDelete: []
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
        // console.log(data)
        this.setState({
          expenses: data.data
        })
      })
      .catch(e => alert(e))
  }

  deleteExpenses = currentUser => {
    const userId = currentUser[0]._id
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/expenses/${this.state.expenses}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          expensesDelete: data.data
        })
      })
      .catch(e => alert(e))
  }

  render () {
    return (
      <React.Fragment>
        <div className='container '>
          <div className='row marginlist3' />
          <div className='jumbotron '>
            <div className='row'>
              <div className='col-md-6 text-center'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-12 colorRed '>
                      Expenses $ {this.calculateTotal()}.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Pagado</th>
                <th scope='col'>Concept</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Date</th>
                <th scope='col'>Delete</th>
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
                  <td>
                    <Button type='submit' value='Incomes' variant='contained'>
                      Delete {this.state.expensesDelete}
                    </Button>
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
