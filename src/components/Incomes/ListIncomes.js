import React, { Component } from 'react'
import './Income.css'

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
        <div className='container marginlist'>
          <div className='row' />
          <div className='jumbotron'>
            <div className='row marginlist3'>
              <div className='col-md-6 text-center'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-12 colorGreen '>
                      January income 2019 $ {this.calculateTotal()}.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Recibido</th>
                <th scope='col'>Concept</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.incomes.map(expense => (
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
