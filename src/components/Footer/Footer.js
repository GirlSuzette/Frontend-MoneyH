import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer class='footer-distributed'>
          <div class='footer-right'>
            <div>Follow</div>
            <Link to='#'>
              <i class='fa fa-facebook' />
            </Link>
            <Link to='#'>
              <i class='fa fa-twitter' />
            </Link>
            <Link to='#'>
              <i class='fa fa-linkedin' />
            </Link>
            <Link to='#'>
              <i class='fa fa-github' />
            </Link>
          </div>

          <div class='footer-left'>
            <p class='footer-links'>
              <Link to='/'>Home</Link>·<Link to='#'>Ingresos</Link>·
              <Link to='/expenses'>Gastos</Link>·<Link to='#'>Meta Ahorro</Link>·
              <Link to='#'>Contact0</Link>
            </p>

            <p>Company Money Home &copy; 2019</p>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}
