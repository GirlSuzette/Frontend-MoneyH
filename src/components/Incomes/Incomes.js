import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Income.css'
import Card from '../MaterialComponents/Card'
import IncomesImage from '../../image/expenses.jpg'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import { Link } from 'react-router-dom'
const Nexmo = require('nexmo')

const styles = {
  grid: {
    width: '60%'
  }
}

class Incomes extends Component {
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
      incomes: []
    }
  }

  calculateTotal () {
    const prices = this.state.incomes.map(p => p.quantity)
    return prices.reduce((a, b) => a + b, 0)
  }

  send = () => {
    const nexmo = new Nexmo({
      apiKey: '00eabd5f',
      apiSecret: 'CpLhv8kQK6zDqg8M'
    })

    const from = 'Nexmo'
    const to = '522282220235'
    const text = `Add Incomes`

    nexmo.message.sendSms(from, to, text)
  }
  componentDidMount () {
    fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(data => {
        console.log(data)
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

  handleDateChange = date => {
    this.setState({ selectedDate: date.toISOString() })
  }

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/users/${this.state.user._id}/incomes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concept: e.target.concept.value,
        quantity: e.target.quantity.value,
        date: this.state.selectedDate,
        type: e.target.type.value
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          error: {
            status: true,
            message: data.message
          }
        })
      })
      .catch(e => alert(e))
    this.send()
    alert('You have successfully registered')
    this.props.history.push('/listincomes')
  }
  render () {
    const { classes } = this.props
    return (
      <div className='incomesContainer'>
        <div className='container'>
          <div class='row'>
            <div className='frm col-sm-4'>
              <Card picture={IncomesImage}>
                <form onSubmit={this.onSubmit}>
                  <div class='row'>
                    <div class='col-6 colorGreen'>Incomes</div>
                    <div class='col- colorGreen'>
                      ${' '}
                      {this.calculateTotal()
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                  </div>
                  <Link className='linkHistory' to='/listincomes'>
                    History
                  </Link>
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
                  <div className='form-group btnExp'>
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
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Incomes' variant='contained'>
                      Save Income
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Incomes.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Incomes)
