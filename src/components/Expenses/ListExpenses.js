import React, { Component } from 'react'
import './expenses.css'
import { Link } from 'react-router-dom'
import AddCircle from '@material-ui/icons/AddCircle'
import Moment from 'react-moment'
import getMonth from '../../utils/Month'

export default class ListExpenses extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      local: '',
      expenses: [],
      expensesMirror: [],
      expensedata: []
    }
  }

  calculateTotal() {
    const prices = this.state.expensedata.map(p => p.quantity)
    return prices.reduce((a, b) => a + b, 0)
  }

  componentDidMount() {
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
          expensedata: data.data,
          expenses: data.data,
          expensesMirror: data.data
        })
      })
      .catch(e => alert(e))
  }

  searchByName = e => {
    let expenses = [...this.state.expenses]
    var query = e.target.value
    if (query !== '') {
      var coincidences = expenses.filter(
        expense =>
          expense.concept.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
      this.setState({
        expenses: coincidences
      })
    } else {
      this.setState({
        expenses: this.state.expensesMirror
      })
    }
  }
  render() {
    const year = new Date().getFullYear()
    // const month = new Date().getMonth()
    const DateYM = getMonth() + ' ' + year
    return (
      <React.Fragment>
        <div class='container marginlist'>
          <div class='row' />
          <div className='flexBus'>
            <input
              onChange={this.searchByName}
              className='inputSearch'
              type='text'
              placeholder='Buscar gasto'
            />
          </div>
          <div class='jumbotron'>
            <div class='row'>
              <div class='col-md-6 text-center'>
                <div className='form-group'>
                  <div class='row'>
                    <div class='col-12 colorRed '>
                      Gastos de {DateYM} ${' '}
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
              <Link to='/expenses'>
                <AddCircle />
              </Link>
              <div className='textAdd'>
                <span>Agregar gasto</span>
              </div>
            </div>
          </div>
          <table class='table c'>
            <thead class='thead-dark'>
              <tr>
                <th scope='col'>Concepto</th>
                <th scope='col'>Cantidad</th>
                <th scope='col'>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {this.state.expenses.map(expense => (
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
