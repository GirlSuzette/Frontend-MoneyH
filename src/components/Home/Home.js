import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import imgOne from '../../image/banner2.jpg'
import imgTwoo from '../../image/banner3.jpg'
import imgThree from '../../image/banner4.jpg'
import imgFour from '../../image/banner5.jpg'
import imgFive from '../../image/banner6.jpg'
import imgSix from '../../image/20181219220434-cobranza.jpeg'
import imgSeven from '../../image/20170505165617-money.jpg'
import icon1 from '../../image/icon1.jpg'
import icon2 from '../../image/icon2.jpg'
import icon3 from '../../image/icon3.jpg'
import './home.css'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.goNext = this.goNext.bind(this)
    this.goPrev = this.goPrev.bind(this)
    this.swiper = null
  }

  goNext () {
    if (this.swiper) this.swiper.slideNext()
  }

  goPrev () {
    if (this.swiper) this.swiper.slidePrev()
  }
  render () {
    const params = {
      spaceBetween: 100,
      centeredSlides: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    return (
      <React.Fragment>
        <div className='HomeImg'>
          <Swiper {...params}>
            <div>
              <img
                class='img-responsive imgHe'
                src={imgThree}
                alt='Smiley face'
              />
            </div>
            <div>
              <img className='img-responsive' src={imgFive} alt='Smiley face' />
            </div>
            <div>
              <img className='img-responsive' src={imgTwoo} alt='Smiley face' />
            </div>
            <div>
              <img className='img-responsive' src={imgFour} alt='Smiley face' />
            </div>
            <div>
              <img className='img-responsive' src={imgOne} alt='Smiley face' />
            </div>
          </Swiper>
        </div>
        <div className='jumbotron text-center'>
          <h1>Money Home</h1>
          <p>
            It tells you what you've spent the money on and helps you optimize
            your daily expenses.
          </p>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='row textHome'>
                <img src={imgSix} alt='Smiley face' /> <br />
                <p>See whether you spend less than you earn </p>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='row textHome'>
                <img src={imgSeven} alt='Smiley face' />
                <p>
                  The app works intuitive, it makes it super easy to control
                  your money. It helps me to develop healthy spending habits
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className='col3 text-center'>
              <img
                className='img-responsive'
                src={icon3}
                alt='Smiley face'
                width='70'
                height='70'
              />
              <h3>Reminders</h3>
              <p>Will notify you to pay the bill or not to exceed the budget</p>
            </div>
            <div className='col3 text-center'>
              <img
                className='img-responsive'
                src={icon2}
                alt='Smiley face'
                width='70'
                height='70'
              />
              <h3>Saving</h3>
              <p>
                See where your money goes and where they come from every month
              </p>
            </div>
            <div className='col3 text-center'>
              <img
                className='img-responsive'
                src={icon1}
                alt='Smiley face'
                width='70'
                height='70'
              />
              <h3>Graphic</h3>
              <p>Analyze your fiance simple and easy to understand graphic</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
