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
    fullName: 'Cindy',
    email: 'su',
    password: '',
    phoneNumber: ''
  }
  handleLogIn = () => {
    const { history } = this.props

    localStorage.removeItem('token')
    history.push('/')
  }

  componentDidMount () {
    fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
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
            this.setState({ user: user })
            return user
          }
        })
        // console.log(currentUser)
        const id = currentUser.map(us => {
          return <input name='id' type='hidden' value={us._id} />
        })
        return id
      })
  }
  updateUser = e => {
    e.preventDefault()

    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

    fetch(`${API_URL}/users/${this.state.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
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
            fullName: data.data.fullName,
            email: data.data.email,
            password: data.data.password,
            phoneNumber: data.data.phoneNumber,
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
    console.log(this.state.fullName)
    return (
      <React.Fragment>
        <div className='thislogin'>
          <div className='expensesContainer'>
            <div className='container ContLogin'>
              <div className='container' id='registration-form'>
                <h1 className='centerTitle sizeTitle'>Update Account</h1>
                <div className='imageUp' />
                <div className='frm'>
                  <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                      <TextField
                        value={this.state.fullName}
                        required
                        name='fullName'
                        type='text'
                        label='Name'
                        fullWidth
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        value={this.state.email}
                        name='email'
                        type='email'
                        label='Email'
                        fullWidth
                        disable='true'
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        value={this.state.phoneNumber}
                        name='number'
                        type='number'
                        label='Phone Number'
                        fullWidth
                        // onChange={this.handleChange}
                      />
                    </div>
                    <div className='form-group'>
                      <TextField
                        required
                        value={this.state.password}
                        name='password'
                        type='password'
                        label='Password'
                        fullWidth

                        // onChange={this.handleChange}
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
                        Update
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
