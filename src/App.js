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

import './App.css'

class App extends Component {
  render () {
    return (
      <div>
        <Menu />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <PrivateRoute path='/expenses' exact component={Expenses} />
          <PrivateRoute path='/incomes' exact component={Incomes} />
          <PrivateRoute path='/savings' exact component={Savings} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App
