import React, { Component } from 'react'
import './Savings.css'

export default class ListSavings extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      savings: []
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

        this.getSavings(currentUser)
      })
  }

  getSavings = currentUser => {
    // console.log(currentUser)
    const userId = currentUser[0]._id
    console.log(userId)
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/savings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          savings: data.data
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
            <div className='row'>
              <div className='col-md-6 text-center'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-12 colorBlue '>
                      Saving goals Car hitch $ 75,342.43/100,000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Ahorrado</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.savings.map(saving => (
                <tr>
                  <td>
                    <input
                      className='form-check-input inputExp'
                      type='checkbox'
                      value=''
                      id='defaultCheck1'
                    />
                  </td>
                  <td>{saving.quantity}</td>
                  <td>{saving.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}
