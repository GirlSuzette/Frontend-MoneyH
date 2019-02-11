import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Income.css'
import MaterialUIPickers from '../MaterialUIPickers/MaterialUIPickers'
import Card from '../MaterialComponents/Card'
import IncomesImage from '../../image/expenses.jpg'

export default class Incomes extends Component {
  render () {
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
                      name='number'
                      type='number'
                      label='Quantity'
                      fullWidth
                    />
                  </div>
                  <MaterialUIPickers label='Fecha' />
                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your type</option>
                        <option value='1'>Fixed</option>
                        <option value='2'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your status</option>
                        <option value='1'>Paid out</option>
                        <option value='2'>By paid</option>
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
