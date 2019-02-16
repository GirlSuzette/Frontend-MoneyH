import React, { Component } from 'react'
import './dashboard.css'
import imgGraf from '../../image/chartjs.png'
import Graphic from '../Graphic/graphic'

export default class Dashboard extends Component {
  render () {
    return (
      <React.Fragment>
        <div className='container marginDash'>
          <div className='row' />
          <h5 className='textDash'>General information </h5>
          <div className='jumbotron'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-6 colorGreen'>Incomes</div>
                    <div className='col-6 colorGreen'>$20,000.00</div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-6 colorRed'>Expenses</div>
                    <div className='col-6 colorRed'>$15,0000.00</div>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-6 colorBlue'>Saving Goal</div>
                    <div className='col-6 colorBlue'>
                      $10,0000.00/
                      <br />
                      $45,000.00
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-6 colorPur'>In General account</div>
                    <div className='col-6 colorPur'>$5,000.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <h2 className='jumbotron text-center colorGreen'> Incomes </h2>
              <Graphic />
            </div>
            <div className='col-md-6'>
              <h2 className='jumbotron text-center colorRed'> Expenses </h2>
              <img className='img-responsive' src={imgGraf} alt='imgGraf' />
            </div>
            <div className='col-md-6 colorBlue'>
              <h2 className='jumbotron text-center colorBlue'>
                {' '}
                Graphs for expenses{' '}
              </h2>
              <img className='img-responsive' src={imgGraf} alt='imgGraf' />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
