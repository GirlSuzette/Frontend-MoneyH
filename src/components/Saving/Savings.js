import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Savings.css'
import Card from '../MaterialComponents/Card'
import ExpensesImage from '../../image/expenses.jpg'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'
import { Link } from 'react-router-dom'

const styles = {
  grid: {
    width: '60%'
  }
}

class Savings extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      error: {
        status: false,
        message: ''
      },
      selectedDate: new Date()
    }
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
        const id = currentUser.map(us => {
          return <input name='id' type='hidden' value={us._id} />
        })
        return id
      })
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date.toISOString() })
  }

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/users/${this.state.user._id}/savings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concept: e.target.concept.value,
        quantity: e.target.quantity.value,
        savingFor: e.target.savingFor.value,
        startDate: this.state.selectedDate,
        duration: e.target.duration.value,
        period: e.target.period.value
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
    alert('You have successfully registered')
    this.props.history.push('/listsavings')
  }

  render () {
    const { classes } = this.props

    return (
      <div className='savingsContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card picture={ExpensesImage}>
                <form onSubmit={this.onSubmit}>
                  <div class='row'>
                    <div class='col-4 colorBlue'>Saving Goals</div>
                  </div>
                  <Link className='linkHistory' to='/listsavings'>
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
                  <div className='form-group btnExp'>
                    <div>
                      <select
                        name='savingFor'
                        className='browser-default custom-select'
                      >
                        <option value='1'>Choose your Saving for</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Biweekly'>Biweekly</option>
                        <option value='Monthly'>Monthly</option>
                      </select>
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
                  <div className='form-group btnExp'>
                    <TextField
                      required
                      name='duration'
                      type='number'
                      label='Duration'
                      fullWidth
                    />
                  </div>
                  <div className='form-group btnExp'>
                    <div>
                      <select
                        name='period'
                        className='browser-default custom-select'
                      >
                        <option value='0'>Choose your period for</option>
                        <option value='1'>Day</option>
                        <option value='2'>Week</option>
                        <option value='3'>Month</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Savings' variant='contained'>
                      Save Saving
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

Savings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Savings)
