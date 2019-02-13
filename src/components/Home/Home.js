import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import imgOne from '../../image/banner2.jpg'
import imgTwoo from '../../image/banner3.jpg'
import imgThree from '../../image/banner4.jpg'
import imgFour from '../../image/banner5.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.goNext = this.goNext.bind(this)
    this.goPrev = this.goPrev.bind(this)
    this.swiper = null
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext()
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev()
  }
  render() {
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
              <img src={imgFour} alt='Smiley face' />
            </div>
          </Swiper>
        </div>
        <div class="container text-center">
          <h3>What We Do</h3><br />
          <div class="row">
            <div class="col-sm-4">
              {/* <img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image" /> */}
              <p>Current Project</p>
            </div>
            <div class="col-sm-4">
              {/* <img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image" /> */}
              <p>Project 2</p>
            </div>
            <div class="col-sm-4">
              <div class="well">
                <p>Some text..</p>
              </div>
              <div class="well">
                <p>Some text..</p>
              </div>
            </div>
          </div>
        </div><br />
      </React.Fragment>
    )
  }
}
