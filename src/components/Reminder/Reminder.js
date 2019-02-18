import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Reminder.css'
import Card from '../MaterialComponents/Card'
import timeImage from '../../image/time.jpg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class Reminder extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      error: {
        status: false,
        message: ''
      },
      selectedDate: this.getCurrentDate(new Date()),
      // selectedDate: '2017-05-24T10:30',
      expenses: []
    }
  }

  getCurrentDate = date => {
    let aaaa = date.getFullYear()
    let gg = date.getDate()
    let mm = date.getMonth() + 1

    if (gg < 10) gg = '0' + gg

    if (mm < 10) mm = '0' + mm

    let cur_day = aaaa + '-' + mm + '-' + gg

    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (hours < 10) hours = '0' + hours

    if (minutes < 10) minutes = '0' + minutes

    return cur_day + 'T' + hours + ':' + minutes
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date })
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

  onSubmit = e => {
    e.preventDefault()
    console.log(e.target.date.value)
    console.log(e.target.concept.value)

    const API_URL =
      'https://cryptic-retreat-15738.herokuapp.com/api/v1/users/' +
      this.state.user._id +
      '/expenses/' +
      e.target.concept.value +
      '/reminders'
    console.log(API_URL)

    fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: e.target.date.value
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
    this.props.history.push('/reminders')
  }

  render () {
    const { classes } = this.props
    console.log(this.state.selectedDate)
    return (
      <div className='reminderContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card cardTitle='Reminder' picture={timeImage}>
                <form className={classes.container} onSubmit={this.onSubmit}>
                  <div className='form-group btnExp'>
                    <div>
                      <select
                        name='concept'
                        className='browser-default custom-select'
                      >
                        <option>Choose your Expenses for</option>status
                        {this.state.expenses.map(expense => {
                          if (expense.status === 'By paid') {
                            return (
                              <option value={expense._id}>
                                {expense.concept}
                              </option>
                            )
                          }
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='form-group btnExp'>
                    <TextField
                      id='datetime-local'
                      name='date'
                      label='Date'
                      type='datetime-local'
                      defaultValue={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>

                  <div class='form-group btnExp'>
                    <Button type='submit' value='Login' variant='contained'>
                      Save
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

Reminder.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Reminder)
