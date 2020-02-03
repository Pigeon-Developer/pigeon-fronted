import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

import { Carousel } from 'src/app/components/index'

const Item = ({ detail }) => {
  return (
    <div className={styles.item}>
      <img src={detail.cover} alt='' />
      <span className={styles.text}>{detail.name}</span>
    </div>
  )
}

Item.item = {
  detail: PropTypes.object.isRequired,
}

const images = [
  {
    cover: 'http://online.njtech.edu.cn/resource/2020/1/20/4b297020-a9a7-4c94-9421-e0960325682a.jpeg',
    name: '测试',
  },
  {
    cover: 'http://online.njtech.edu.cn/resource/2020/1/20/9b3d3922-8571-4861-8235-c3bfa62952b0.jpeg',
    name: '测试',
  },
]

const Banner = () => {
  return (
    <div className='margin-bottom-sm'>
      <div className='container'>
        <div className='columns'>
          <div className='column col-8 padding-left-no'>
            <Carousel />
          </div>
          <div
            className={classNames('column col-4 padding-right-no', styles.hot)}
          >
            {images.map((item, index) => (
              <Item key={index} detail={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
