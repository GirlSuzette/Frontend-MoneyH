import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Income.css'
import MaterialUIPickers from '../MaterialUIPickers/MaterialUIPickers'
import Card from '../MaterialComponents/Card'
import IncomesImage from '../../image/expenses.jpg'

export default class Incomes extends Component {
  state = {
    error: {
      status: false,
      message: ''
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/users/:userId/incomes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concept: e.target.concept.value,
        quantity: e.target.quantity.value,
        date: e.target.date.value,
        type: e.target.type.value,
        status: e.target.status.value,
        user: e.params.userId,
        
      })
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data.token !== 'undefined') {
          localStorage.setItem('token', data.token)
          const url = window.decodeURIComponent(this.props.location.search)
          console.log(url)
          if (url !== '') {
            this.props.history.push('/' + url.split('/')[1] || '/')
          } else {
            this.props.history.push('/login')
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
    return (
      <div className='incomesContainer'>
        <div className='container'>
          <div class='row'>
            <div className='frm col-sm-4'>
              <Card cardTitle='Incomes' picture={IncomesImage}>
                <form>
                  <span>Income</span>
                  <span className='moneyExp'>$4000</span>
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
                  <MaterialUIPickers label='Fecha' />
                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your type</option>
                        <option value='type'>Fixed</option>
                        <option value='type'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your status</option>
                        <option value='type'>Paid out</option>
                        <option value='type'>By paid</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Login' variant='contained'>
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
