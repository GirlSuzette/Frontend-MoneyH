import React, { Component } from 'react';

import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Incomes from "./components/Incomes";
import Expenses from "./components/Expenses";
import Savings from "./components/Savings";
import Dashboard from './components/Dashboard';
import PrivateRoute from "./components/PrivateComponent";


import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/expenses" exact component={Expenses} />
          <PrivateRoute path="/incomes" exact component={Incomes} />
          <PrivateRoute path="/savings" exact component={Savings} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
