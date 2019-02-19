import React, { Component } from 'react'
import './Income.css'
import { Link } from 'react-router-dom'
import AddCircle from '@material-ui/icons/AddCircle'
import Moment from 'react-moment'
import Button from '@material-ui/core/Button'

export default class ListIncomes extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      incomes: [],
      incomesMirror: [],
      incomesdata: []
    }
  }

  calculateTotal () {
    const prices = this.state.incomesdata.map(p => p.quantity)
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
          incomesdata: data.data,
          incomes: data.data,
          incomesMirror: data.data
        })
      })
      .catch(e => alert(e))
  }
  searchByName = e => {
    let incomes = [...this.state.incomes]
    var query = e.target.value
    if (query !== '') {
      var coincidences = incomes.filter(
        expense =>
          expense.concept.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
      this.setState({
        incomes: coincidences
      })
    } else {
      this.setState({
        incomes: this.state.incomesMirror
      })
    }
  }

  render () {
    return (
      <React.Fragment>
        <div class='container marginlist'>
          <div class='row' />
          <div className='flexBus'>
            <Button type='submit' value='Expenses' variant='contained'>
              Update
            </Button>
            <input
              onChange={this.searchByName}
              className='inputSearch'
              type='text'
              placeholder='Search'
            />
          </div>
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
              <Link to='/incomes'>
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
              {this.state.incomes.map(income => (
                <tr>
                  <td>{income.concept}</td>
                  <td>
                    {'$ ' +
                      income.quantity
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </td>
                  <td>
                    <Moment format='YYYY/MM/DD'>{income.date}</Moment>
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
