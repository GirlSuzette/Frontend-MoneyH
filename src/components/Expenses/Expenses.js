import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './expenses.css'
import MaterialUIPickers from '../MaterialUIPickers/MaterialUIPickers'
import Card from '../MaterialComponents/Card'
import ExpensesImage from '../../image/expenses.jpg'

export default class Expenses extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      local: ''

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
      })
  }

  findUser = (users) => {
    const token = localStorage.getItem('token')
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const t = JSON.parse(window.atob(base64));
    console.log(t.email)
    const currentUser = users.filter(user => {
      if (user.email === t.email) {
        return user
      }
    })
    console.log(currentUser)
    const id = currentUser.map(us => {
      return (<input name="id" type="hidden" value={us._id} />)
    })
    return id
  }
  render() {
    const {users } = this.state
    return (
      <div className='expensesContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card cardTitle='Expenses' picture={ExpensesImage}>
                <form onSubmit={this.findUser}>
                  <span>Expenses</span>
                  <span className='moneyExp'>$20000</span>
                  {this.findUser(users)}
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
                  <div className='form-group'>
                    <MaterialUIPickers label='Date' />
                  </div>
                  <div className='form-group'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your type</option>
                        <option value='1'>Fixed</option>
                        <option value='2'>Variable</option>
                      </select>
                    </div>
                  </div>
                  <div class='form-group btnExp'>
                    <Button type='submit' value='Login' variant='contained'>
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
