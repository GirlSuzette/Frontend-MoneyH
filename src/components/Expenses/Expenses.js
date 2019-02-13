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

const styles = {
  grid: {
    width: '60%'
  }
}

class Expenses extends Component {

  constructor() {
    super();
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



  componentDidMount() {
    fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(data => {

        console.log(data)
        this.setState({
          users: data.data
        })

        const token = localStorage.getItem('token')
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        const t = JSON.parse(window.atob(base64));
        // console.log(t.email)
        const currentUser = data.data.filter(user => {
          if (user.email === t.email) {
            this.setState({ user: user })
            return user
          }
        })
        // console.log(currentUser)
        const id = currentUser.map(us => {
          return (<input name="id" type="hidden" value={us._id} />)
        })
        return id
      })

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
        status: e.target.status.value,
      })

    })
      .then(response => response.json())
      .then(data => {
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
  }


  render() {
    const { classes } = this.props
    // console.log(this.state)
    return (
      <div className='expensesContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card cardTitle='Expenses' picture={ExpensesImage}>
                <form onSubmit={this.onSubmit}>
                  <span>Expenses</span>
                  <span className='moneyExp'>$20000</span>
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
                      <Grid container className={classes.grid} justify='space-around'>
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
                      <select name='type' className='browser-default custom-select'>
                        <option >Choose your type</option>
                        <option value='Fixed'>Fixed</option>
                        <option value='Variable'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div>
                      <select name='status' className='browser-default custom-select'>
                        <option >Choose your status</option>
                        <option value='Fixed'>Fixed</option>
                        <option value='Variable'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Expenses' variant='contained'>
                      Save Expenses
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

Expenses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Expenses)