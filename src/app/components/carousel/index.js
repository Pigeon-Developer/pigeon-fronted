import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti'
import './index.scss'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showIndex: 0, //显示第几个图片
      timer: null, // 定时器
      show: false, // 前后按钮显示
    }
  }

  render() {
    return (
      <div
        className='contain'
        onMouseEnter={() => {
          this.stop()
        }} //鼠标进入停止自动播放
        onMouseLeave={() => {
          this.start()
        }} //鼠标退出自动播放
      >
        <ul className='ul'>
          {this.props.images.map((value, index) => {
            return (
              <li
                className={index === this.state.showIndex ? 'show' : ''}
                key={index}
              >
                <img src={value} alt='轮播图' />
              </li>
            )
          })}
        </ul>
        <ul
          className='dots'
          style={{ width: this.props.images.length * 20 + 'px' }}
        >
          {this.props.images.map((value, index) => {
            return (
              <li
                key={index}
                className={index === this.state.showIndex ? 'active' : ''}
                onClick={() => {
                  this.change(index)
                }}
              />
            )
          })}
        </ul>
        <div className='control'>
          <TiChevronLeft
            className='left'
            onClick={e => {
              this.previous(e)
            }}
          />
          <TiChevronRight
            className='right'
            onClick={e => {
              this.next(e)
            }}
          />
        </div>
      </div>
    )
  }
  componentDidMount() {
    //一开始自动播放
    this.start()
  }
  componentWillUnmount() {
    //销毁前清除定时器
    this.stop()
  }
  stop = () => {
    //暂停
    let { timer } = this.state
    clearInterval(timer)
  }
  start = () => {
    //开始
    const timer = setInterval(() => {
      this.next()
    }, 2000)
    this.setState({
      timer,
    })
  }

  change = showIndex => {
    //点击下面的按钮切换当前显示的图片
    this.setState({
      showIndex,
    })
  }

  previous = () => {
    //上一张
    let { showIndex } = this.state
    const { images } = this.props
    if (showIndex <= 0) {
      showIndex = images.length - 1
    } else {
      showIndex--
    }
    this.setState({
      showIndex,
    })
  }

  next = () => {
    //下一张
    let { showIndex } = this.state
    const { images } = this.props
    if (showIndex >= images.length - 1) {
      showIndex = 0
    } else {
      showIndex++
    }
    this.setState({
      showIndex,
    })
  }
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
}

Carousel.defaultProps = {
  images: [
    'http://online.njtech.edu.cn/resource/2020/1/11/49ziV8k8j7LMYGV.jpg',
    'http://online.njtech.edu.cn/resource/2020/1/11/EDH86AiKExevY9L.jpg',
    'http://online.njtech.edu.cn/resource/2020/1/11/49ziV8k8j7LMYGV.jpg',
    'http://online.njtech.edu.cn/resource/2020/1/11/EDH86AiKExevY9L.jpg',
    'http://online.njtech.edu.cn/resource/2020/1/11/49ziV8k8j7LMYGV.jpg',
    'http://online.njtech.edu.cn/resource/2020/1/11/EDH86AiKExevY9L.jpg',
  ], // 图片数组
}

export default Carousel
