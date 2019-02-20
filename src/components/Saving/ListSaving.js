import React, { Component } from 'react'
import './Savings.css'
import Moment from 'react-moment'
import AddCircle from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
import getMonth from '../../utils/Month'

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
    const year = new Date().getFullYear()
    const DateYM = getMonth() + ' ' + year
    return (
      <React.Fragment>
        <div class='container marginlist'>
          <div class='row' />
          <div class='jumbotron'>
            <div class='row'>
              <div class='col-md-6 text-center'>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-12 colorBlue '>
                      Saving goals {DateYM} Car hitch $ 75,342.43/100,000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='btnAddInc'>
              <Link to='/savings'>
                <AddCircle />
              </Link>
              <div className='textAdd'>
                <span>Add Saving goals</span>
              </div>
            </div>
          </div>
          <table class='table'>
            <thead class='thead-dark'>
              <tr>
                <th scope='col'>Quantity</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.savings.map(saving => (
                <tr>
                  <td>
                    {'$ ' +
                      saving.quantity
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </td>
                  <td>
                    <Moment format='YYYY/MM/DD'>{saving.date}</Moment>
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
