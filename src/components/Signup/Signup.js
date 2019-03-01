import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './signup.css'

class Signup extends React.Component {
  state = {
    error: {
      status: false,
      message: ''
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: e.target.fullName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phoneNumber: e.target.number.value
      })
    })
      .then(response => response.json())
      .then(data => {
        if (typeof data.token !== 'undefined') {
          localStorage.setItem('token', data.token)
          const url = window.decodeURIComponent(this.props.location.search)

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
    alert('Se ha registrado exitosamente')
    this.props.history.push('/login')
  }
  render () {
    return (
      <React.Fragment>
        <div className='thislogin'>
          <div className='expensesContainer'>
            <div className='container ContLogin'>
              <div className='container' id='registration-form'>
                <h1 className='centerTitle sizeTitle'>Crea tu cuenta</h1>
                <div className='image' />
                <div className='frm'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <TextField
                        required
                        name='fullName'
                        type='text'
                        label='Nombre'
                        fullWidth
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='email'
                        type='email'
                        label='Email'
                        fullWidth
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='number'
                        type='number'
                        label='Número Celular'
                        onInput={e => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10)
                        }}
                        fullWidth
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='password'
                        type='password'
                        label='Contraseña'
                        fullWidth
                        // onChange={this.handleChange}
                      />
                    </div>
                    {this.state.error.status && (
                      <p>{this.state.error.message}</p>
                    )}
                    <div class='form-group'>
                      <Button type='submit' value='Login' variant='contained'>
                        Registrarse
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Signup
