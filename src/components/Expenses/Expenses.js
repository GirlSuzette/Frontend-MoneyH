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
// import addCommas from '../../utils/addComas'

const Nexmo = require('nexmo')

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
      expenses: [],
      expensesBal: null,
      incomesBal: null,
      balance: '0'
    }
  }

  send = () => {
    const nexmo = new Nexmo({
      apiKey: 'cfe089da',
      apiSecret: 'cRQsMIyv015nFMaZ'
    })

    const from = 'Nexmo'
    const to = '5215610591995'
    const text = `Agregaste un gasto`

    nexmo.message.sendSms(from, to, text)
  }

  calculateTotal () {
    const prices = this.state.expenses.map(p => p.quantity)
    return prices.reduce((a, b) => a + b, 0)
  }

  componentDidMount () {
    this.getExpenses()
    this.getBalance()
  }

  getExpenses = () => {
    const userId = this.props.data._id
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

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'
    if (this.state.balance > e.target.quantity.value) {
      fetch(`${API_URL}/users/${this.props.data._id}/expenses`, {
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
          this.setState({
            error: {
              status: true,
              message: data.message
            }
          })
        })
        .catch(e => alert(e))
      this.send()
      alert('Se ha registrado exitosamente')
      this.props.history.push('/listexpenses')
    } else {
      alert('Tus ingresos no deben ser mayor a tus gastos')
    }
  }

  getBalance = () => {
    const userId = this.props.data._id
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/balances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          incomesBal: data.data[0].incomes,
          expensesBal: data.data[0].expenses,
          balance: data.data[0].balance
        })
      })
      .catch(e => alert(e))
  }

  render () {
    const { classes } = this.props

    return (
      <div className='expensesContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card picture={ExpensesImage}>
                <form onSubmit={this.onSubmit}>
                  <div class='row'>
                    <div class='col-6 colorRed'>Gastos</div>
                    <div class='col- colorRed'>
                      ${' '}
                      {this.calculateTotal()
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </div>
                  </div>
                  {/* <div className='row'>
                    <div className='col-6 colorPur'>Balance</div>
                    <div className='col- colorPur'>
                      $ {addCommas(this.props.balance)}
                    </div>
                  </div> */}
                  <Link className='linkHistory' to='/listexpenses'>
                    <i className='material-icons eyesIcon'>
                      <span>Ver Historial</span> remove_red_eye{' '}
                    </i>
                  </Link>
                  <div className='form-group'>
                    <TextField
                      required
                      name='concept'
                      type='text'
                      label='Concepto'
                      fullWidth
                    />
                  </div>
                  <div className='form-group'>
                    <TextField
                      required
                      name='quantity'
                      type='decimal'
                      label='Cantidad'
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
                          label='Fecha'
                          value={this.state.selectedDate}
                          onChange={this.handleDateChange}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className='sm-6 marginType'>
                    <div>
                      <select
                        name='type'
                        className='browser-default custom-select'
                      >
                        <option value='1'>Elige tipo de gasto</option>
                        <option value='Fixed'>Fijo</option>
                        <option value='Variable'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div className='sm-6'>
                    <div>
                      <select
                        name='status'
                        className='browser-default custom-select'
                      >
                        <option value='1'>Elige el estatus del gasto</option>
                        <option value='Paid out'>Pagado</option>
                        <option value='By paid'>Por pagar</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExps'>
                    <Button
                      className='SubmitBtn'
                      type='submit'
                      value='Expenses'
                      variant='contained'
                    >
                      <span className='textSubmit'>Guardar gasto</span>
                    </Button>
                    <div className='form-group'>
                      <div className='btnAdd'>
                        <Link to='/reminders'>
                          <AddCircle />
                        </Link>
                        <div>
                          <span>Agregar recordatorio</span>
                        </div>
                      </div>
                    </div>
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
