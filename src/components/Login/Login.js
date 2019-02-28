import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './login.css'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    error: {
      status: false,
      message: ''
    }
  }
  
  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
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
    return (
      <React.Fragment>
        <div className='thislogin'>
          <div className='expensesContainer'>
            <div className='container ContLogin'>
              <div className='container' id='registration-form'>
                <h1 className='centerTitle sizeTitle'>Inicia sesión</h1>
                <div className='image' />
                <div className='frm'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <TextField
                        required
                        name='email'
                        label='Email'
                        fullWidth
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='password'
                        type='password'
                        label='Contraseña'
                        fullWidth
                      />
                    </div>
                    {this.state.error.status && <p>{this.state.error.message}</p>}
                    <div className='form-group'>
                      <Button
                        type='submit'
                        value='Login'
                        variant='contained'
                      // onClick={this.handleLogout}
                      >
                        Iniciar sesión
                  </Button>
                      <div className='signupContainer'>
                        <p>
                          ¿Nuevo en Money Home?
                      <Link className='signupLink' to='/signup'>
                            Regístrate ahora »
                      </Link>
                        </p>
                      </div>
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

export default Login
