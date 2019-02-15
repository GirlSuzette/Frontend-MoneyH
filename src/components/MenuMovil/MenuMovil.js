import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HomeBlue from '../../image/interfaz-de-hogar.svg'
import ingresos from '../../image/ingresos.svg'
import inversion from '../../image/inversion.svg'

import './MenuMovil.css'

export default class MenuApp extends Component {
  render () {
    return (
      <div className='MenuMovilWrap'>
        <div className='MenuMovilWrapMid'>
          <div className='OptionWrap'>
            <Link className='responItem' to='/'>
              <div className='OptionCell'>
                <div className='WrappperApp'>
                  <img src={HomeBlue} className='ImageMenuMovil' alt='Home' />
                  <p className='TextMenu'>Home</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='OptionWrap'>
            <Link to={'/dashboard'}>
              <div className='OptionCell'>
                <div className='WrappperApp'>
                  <img
                    src={inversion}
                    className='ImageMenuMovil'
                    alt='inversion'
                  />
                  <p className='TextMenu'>Dashboard</p>
                </div>
              </div>
            </Link>
          </div>
          <div className='OptionWrap'>
            <Link to={'/incomes'}>
              <div className='OptionCell'>
                <div className='WrappperApp'>
                  <img
                    src={ingresos}
                    className='ImageMenuMovil'
                    alt='ingresos'
                  />
                  <p className='TextMenu'>Incomes</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
