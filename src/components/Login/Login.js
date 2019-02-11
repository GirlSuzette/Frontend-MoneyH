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
  handleLogIn = () => {
    const { history } = this.props

    localStorage.removeItem('token')
    history.push('/')
  }

  onSubmit = e => {
    e.preventDefault()

    const API_URL = 'https://secure-thicket-75424.herokuapp.com/api/v1/'

    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: e.target.username.value,
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
  render () {
    return (
      <React.Fragment>
        <div className='thislogin'>
          <div className='container' id='registration-form'>
            <h1 className='centerTitle'>Log In</h1>
            <div className='image' />
            <div className='frm'>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <TextField
                    required
                    name='username'
                    label='Email'
                    fullWidth
                    // onChange={this.handleChange}
                  />
                </div>
                <div className='form-group'>
                  <TextField
                    required
                    name='password'
                    type='password'
                    label='Password'
                    fullWidth
                    // onChange={this.handleChange}
                  />
                </div>
                {this.state.error.status && <p>{this.state.error.message}</p>}
                <div className='form-group'>
                  <Button
                    type='submit'
                    value='Login'
                    variant='contained'
                    onClick={this.handleLogout}
                  >
                    Login
                  </Button>
                  <div className='signupContainer'>
                    <p>
                      Don't have an Money Home account yet?
                      <Link className='signupLink' to='/signup'>
                        Sign up now!
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login
