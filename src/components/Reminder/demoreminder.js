import React, { Component } from 'react'
import CronBuilder from 'react-cron-builder'
import 'react-cron-builder/dist/bundle.css'

class Demoreminder extends Component {
  componentDidMount () {
    this.hello()
  }
  hello = () => {
    console.log('entra')
    var schedule = require('node-schedule')
    console.log(new Date())

    var date = new Date().toISOString()
    console.log(date)

    var j = schedule.scheduleJob(date, function () {
      console.log('The world is going to end today.')
    })
  }

  render () {
    return (
      <React.Fragment>
        <span>cron</span>
      </React.Fragment>
    )
  }
}
export default Demoreminder
