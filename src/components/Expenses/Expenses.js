import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './expenses.css'
import Card from '../MaterialComponents/Card'
import ExpensesImage from '../../image/expenses.jpg'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import { Link } from 'react-router-dom'
import AddCircle from '@material-ui/icons/AddCircle'

const styles = {
  grid: {
    width: '60%'
  }
}

class Expenses extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      error: {
        status: false,
        message: ''
      },
      selectedDate: new Date(),
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
        //   console.log(data)
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
        // console.log(currentUser)
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

  handleDateChange = date => {
    this.setState({ selectedDate: date.toISOString() })
  }

  handleExpense = () => {
    const { history } = this.props
    history.push('/expenses')
  }

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/users/${this.state.user._id}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concept: e.target.concept.value,
        quantity: e.target.quantity.value,
        date: this.state.selectedDate,
        type: e.target.type.value,
        status: e.target.status.value
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (typeof data.token !== 'undefined') {
          localStorage.setItem('token', data.token)
          const url = window.decodeURIComponent(this.props.location.search)
          // console.log(url)
          if (url !== '') {
            this.props.history.push('/' + url.split('/')[1] || '/')
          } else {
            this.props.history.push('/')
          }
        } else {
          this.setState({
            error: {
              status: true,
              message: data.message
            }
          })
        }
      })
      .catch(e => alert(e))
    this.props.history.push('/expenses')
  }

  render () {
    const { classes } = this.props
    // console.log(this.state)
    return (
      <div className='expensesContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card picture={ExpensesImage}>
                <form onSubmit={this.onSubmit}>
                  <div class='row'>
                    <div class='col-6 colorRed'>Expenses</div>
                    <div class='col-6 colorRed'>
                      {' '}
                      $ {this.calculateTotal()}.00
                    </div>
                  </div>
                  <div className='form-group'>
                    <TextField
                      required
                      name='concept'
                      type='text'
                      label='Concept'
                      fullWidth
                    />
                  </div>
                  <div className='form-group'>
                    <TextField
                      required
                      name='quantity'
                      type='decimal'
                      label='Quantity'
                      fullWidth
                    />
                  </div>
                  <div className='form-group'>
                    <div className='btnAdd'>
                      <Link to='/reminders'>
                        <AddCircle />
                      </Link>
                      <div>
                        <span>Add payment reminder</span>
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid
                        container
                        className={classes.grid}
                        justify='space-around'
                      >
                        <DatePicker
                          margin='normal'
                          label='Date'
                          value={this.state.selectedDate}
                          onChange={this.handleDateChange}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className='form-group'>
                    <div>
                      <select
                        name='type'
                        className='browser-default custom-select'
                      >
                        <option value='1'>Choose your type</option>
                        <option value='Fixed'>Fixed</option>
                        <option value='Variable'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div>
                      <select
                        name='status'
                        className='browser-default custom-select'
                      >
                        <option value='1'>Choose your status</option>
                        <option value='Paid out'>Paid out</option>
                        <option value='By paid'>By paid</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Expenses' variant='contained'>
                      Save Expenses
                    </Button>
                  </div>
                  <Link className='linkHistory' to='/listexpenses'>
                    Expenses history
                  </Link>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Expenses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Expenses)
