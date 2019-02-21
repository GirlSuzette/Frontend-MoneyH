import React, { Component } from 'react'
import './dashboard.css'
import { Bar } from 'react-chartjs-2'

export default class DashSaving extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      local: '',
      savings: []
    }
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

        this.getSavings(currentUser)
      })
  }

  getSavings = currentUser => {
    // console.log(currentUser)
    const userId = currentUser[0]._id
    console.log(userId)
    const API_URL = 'https://cryptic-retreat-15738.herokuapp.com/api/v1'
    fetch(`${API_URL}/users/${userId}/savings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        this.setState({
          savings: data.data
        })
      })
      .catch(e => alert(e))
  }

  getSav = () => {
    const getInc = this.state.savings.map(exp => {
      return exp.quantity
    })
    return getInc
  }

  getData = () => {
    const getData = this.state.savings.map(exp => {
      const newdate = exp.startDate
      const d = newdate.replace(/T/g, '-')
      const y = d.split('-')
      const newData = exp.concept + ' ' + y[0] + '-' + y[2]
      const horas = y[3].replace(/:/g, '-')
      const x = horas.split('-')
      // console.log(x)
      return newData
    })
    return getData
  }

  render () {
    const data = {
      labels: [...this.getData()],
      datasets: [
        {
          label: '# of Votes',
          data: [...this.getSav()],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }

    const options = {
      duration: 7000,
      title: {
        display: true,
        text: 'Savings',
        fontSize: 20
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
    return (
      <React.Fragment>
        <Bar data={data} width={100} height={450} options={options} />
      </React.Fragment>
    )
  }
}
