import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Menu from './components/Menu/Menu'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Incomes from './components/Incomes/Incomes'
import Expenses from './components/Expenses/Expenses'
import Savings from './components/Saving/Savings'
import Dashboard from './components/Dashboard/Dashboard'
import PrivateRoute from './components/PrivateComponent/PrivateComponent'
import Footer from './components/Footer/Footer'
import UpdateUser from './components/Signup/UpdateUser'
import ListIncomes from './components/Incomes/ListIncomes'
import ListExpenses from './components/Expenses/ListExpenses'
import ListSavings from './components/Saving/ListSaving'
import MenuApp from './components/MenuMovil/MenuMovil'
import Reminder from './components/Reminder/Reminder'


import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      user: '',
      loading: true
    }
  }

  componentDidMount() {
    fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.data,
          loading: false
        })

        const token = localStorage.getItem('token')
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        const t = JSON.parse(window.atob(base64))
        const currentUser = data.data.filter(user => {
          if (user.email === t.email) {
            this.setState({ user: user })
            return user
          }
        })

      })
  }

  render() {
    console.log(this.state.user)
    return (
      <div>
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <PrivateRoute path='/update' exact component={UpdateUser} />
          {/* <PrivateRoute path='/expenses' exact component={Expenses} /> */}
          {/* <PrivateRoute path='/incomes' exact component={Incomes} /> */}
          {/* <PrivateRoute path='/dashboard' exact component={Dashboard} /> */}
          <PrivateRoute path='/savings' exact component={Savings} />
          <PrivateRoute path='/listincomes' exact component={ListIncomes} />
          <PrivateRoute path='/listexpenses' exact component={ListExpenses} />
          <PrivateRoute path='/listsavings' exact component={ListSavings} />
          <PrivateRoute path='/reminders' exact component={Reminder} />
          {!this.state.loading && this.state.user && (<PrivateRoute exact path='/incomes'

            component={props => {
              return (
                <Incomes {...props} data={this.state.user} />
              );
            }}

          />)}
          {!this.state.loading && this.state.user && (<PrivateRoute exact path='/expenses'

            component={props => {
              return (
                <Expenses {...props} data={this.state.user} />
              );
            }}

          />)}
          {!this.state.loading && this.state.user && (<PrivateRoute exact path='/dashboard'

            component={props => {
              return (
                <Dashboard {...props} data={this.state.user} />
              );
            }}

          />)}
        </Switch>
        <Footer />
        <MenuApp />
      </div>
    )
  }
}

export default App
