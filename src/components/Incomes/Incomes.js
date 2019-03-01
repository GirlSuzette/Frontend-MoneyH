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
// import addCommas from '../../utils/addComas'

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
      apiKey: 'cfe089da',
      apiSecret: 'cRQsMIyv015nFMaZ'
    })

    const from = 'Nexmo'
    const to = '5215610591995'
    const text = `Agregaste un Ingreso`

    nexmo.message.sendSms(from, to, text)
  }

  componentDidMount () {
    this.getIncomes()
  }

  getIncomes = () => {
    const userId = this.props.data._id

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'

    fetch(`${API_URL}/users/${userId}/incomes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
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

    fetch(`${API_URL}/users/${this.props.data._id}/incomes`, {
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
    alert('Se ha registrado exitosamente')
    this.props.history.push('/listincomes')
  }
  render () {
    const { classes } = this.props
    return (
      <div className='incomesContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card picture={IncomesImage}>
                <form onSubmit={this.onSubmit}>
                  <div className='row'>
                    <div className='col-6 colorGreen'>Ingresos</div>
                    <div className='col- colorGreen'>
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
                  <Link className='linkHistory' to='/listincomes'>
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
                  <div className='form-group btnExp'>
                    <div>
                      <select
                        name='type'
                        className='browser-default custom-select'
                      >
                        <option value='1'>Elige tipo de ingreso</option>
                        <option value='Fixed'>Fijo</option>
                        <option value='Variable'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group btnExp'>
                    <Button type='submit' value='Incomes' variant='contained'>
                      Guardar ingreso
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
