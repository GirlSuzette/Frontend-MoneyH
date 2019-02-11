import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import imgOne from '../../image/graf.jpg'
import imgTwoo from '../../image/00-apps-cover.jpg'
import imgThree from '../../image/20772.jpg'

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
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
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
        <div>
          <Swiper {...params}>
            <div>
              <img src={imgOne} alt='Smiley face' />
            </div>
            <div>
              <img src={imgTwoo} alt='Smiley face' />
            </div>
            <div>
              <img src={imgThree} alt='Smiley face' />
            </div>
            <div>
              <img src={imgOne} alt='Smiley face' />
            </div>
            <div>
              <img src={imgOne} alt='Smiley face' />
            </div>
          </Swiper>
        </div>
      </React.Fragment>
    )
  }
}
