import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './expenses.css'
import MaterialUIPickers from '../MaterialUIPickers/MaterialUIPickers'
import Card from '../MaterialComponents/Card'
import ExpensesImage from '../../image/expensesUpdate.jpg'

export default class Expenses extends Component {
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


    componentDidMount() {
        fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
            .then(response => response.json())
            .then(data => {

                console.log(data)
                this.setState({
                    users: data.data
                })

                const token = localStorage.getItem('token')
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                const t = JSON.parse(window.atob(base64));
                // console.log(t.email)
                const currentUser = data.data.filter(user => {
                    if (user.email === t.email) {
                        this.setState({ user: user })
                        return user
                    }
                })
                // console.log(currentUser)
                const id = currentUser.map(us => {
                    return (<input name="id" type="hidden" value={us._id} />)
                })
                return id
            })

    }
    onSubmit = e => {
        e.preventDefault()

        const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1/'

        fetch(`${API_URL}/users/${this.state.user._id}`, {
            method: 'PUT',
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
    rend
    render() {
        return (
            <div className='expUpContainer'>
                <div className='container'>
                    <div className='row'>
                        <div className='frm col-sm-4'>
                            <Card cardTitle='Update this expense' picture={ExpensesImage}>
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
                                            name='quantity'
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
                                            Update Expenses
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
