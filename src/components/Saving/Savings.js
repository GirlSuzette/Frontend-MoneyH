import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Savings.css'
import MaterialUIPickers from '../MaterialUIPickers/MaterialUIPickers'
import Card from '../MaterialComponents/Card'
import ExpensesImage from '../../image/expenses.jpg'

export default class Savings extends Component {
  render () {
    return (
      <div className='savingsContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card cardTitle='Savings Goal' picture={ExpensesImage}>
                <form>
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
                      type='decimal'
                      label='Quantity'
                      fullWidth
                    />
                  </div>

                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your Saving for</option>
                        <option value='1'>Weekly</option>
                        <option value='2'>Biweekly</option>
                        <option value='3'>Monthly</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <MaterialUIPickers label='Start' />
                  </div>
                  <div className='form-group btnExp'>
                    <TextField
                      required
                      name='number'
                      type='number'
                      label='Duration'
                      fullWidth
                    />
                  </div>
                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your Saving for</option>
                        <option value='1'>Day</option>
                        <option value='2'>Week</option>
                        <option value='3'>Month</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Login' variant='contained'>
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
