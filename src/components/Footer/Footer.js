import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default class Footer extends Component {
  render () {
    return (
      <React.Fragment>
        <footer className='footer-distributed'>
          <div className='footer-right'>
            <div>Follow</div>
            <Link to='#'>
              <i className='fa fa-facebook' />
            </Link>
            <Link to='#'>
              <i className='fa fa-twitter' />
            </Link>
            <Link to='#'>
              <i className='fa fa-linkedin' />
            </Link>
            <Link to='#'>
              <i className='fa fa-github' />
            </Link>
          </div>
          <div className='footer-left'>
            <p className='footer-links'>
              <Link to='/'>Home</Link>·<Link to='#'>Income</Link>·
              <Link to='/expenses'>Expenses</Link>·<Link to='#'>Saving</Link>·
              <Link to='#'>Contact</Link>
            </p>
            <p>Company Money Home &copy; 2019</p>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}
