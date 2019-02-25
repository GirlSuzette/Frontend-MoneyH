import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './updateUser.css'

class UpdateUser extends React.Component {
  state = {
    users: [],
    local: '',
    error: {
      status: false,
      message: ''
    },
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
  }

  componentDidMount() {
    fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users', {
      headers: {
        Authorization: `barear ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.data
        })

        const token = localStorage.getItem('token')
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        const t = JSON.parse(window.atob(base64))
        // console.log(t.email)
        const currentUser = data.data.filter(user => {
          if (user.email === t.email) {
            this.setState({
              user: user,
              fullName: user.fullName,
              email: user.email,
              phoneNumber: user.phoneNumber
            })
            return user
          }
        })
        // console.log(currentUser)

        return currentUser
      })
  }

  onChangeInput = e => this.setState({ [e.target.name]: [e.target.value] })

  onSubmit = e => {
    e.preventDefault()

    const API_URL = `https://cryptic-retreat-15738.herokuapp.com/api/v1/`


    fetch(`${API_URL}/users/${this.state.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: this.state.fullName[0],
        email: this.state.email,
        password: this.state.password[0],
        phoneNumber: this.state.phoneNumber
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          error: {
            status: true,
            message: data.message,
            redirect: true
          }
        })
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
                <h1 className='centerTitle sizeTitle'>Actualizar Cuenta</h1>
                <div className='imageUp' />
                <div className='frm'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <TextField
                        required
                        name='fullName'
                        type='text'
                        label='Nombre'
                        fullWidth
                        value={this.state.fullName}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='email'
                        type='email'
                        label='Email'
                        fullWidth
                        value={this.state.email}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='phoneNumber'
                        type='number'
                        label='Número Celular'
                        fullWidth
                        maxlength='10'
                        onInput={e => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10)
                        }}
                        value={this.state.phoneNumber}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        name='password'
                        type='password'
                        label='Contraseña'
                        fullWidth
                        value={this.state.password}
                        onChange={this.onChangeInput}
                      />
                    </div>
                    {this.state.error.status && (
                      <p>{this.state.error.message}</p>
                    )}
                    <div class='form-group'>
                      <Button
                        type='submit'
                        value='Login'
                        variant='contained'
                        onClick={this.handleLogout}
                      >
                        Actualizar
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

export default UpdateUser
