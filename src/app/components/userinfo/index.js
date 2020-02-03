import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
import { formatTime } from '../../util/time'

const UserInfo = () => {
  const { loginInfo } = useSelector(state => state.app)
  return (
    <div
      className={classNames(
        'paper padding-no padding-bottom-sm margin-bottom-sm',
        styles.container,
      )}
    >
      <div className={styles.bg}>
        <img
          src='http://online.njtech.edu.cn/resource/2020/1/19/49ziV8k8j7LMYGV.jpg'
          alt=''
        />
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img
            src={
              loginInfo.avatarUrl &&
              (loginInfo.avatarUrl.indexOf('http') === -1
                ? `http://online.njtech.edu.cn${loginInfo.avatarUrl}`
                : loginInfo.avatarUrl)
            }
            alt=''
          />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <span className={classNames(styles.name, 'margin-right-xs')}>
              {loginInfo.nickname}
            </span>
            <span>第{loginInfo.id - 1999}号会员</span>
          </div>
          {loginInfo.createdOn && (
            <span>加入于{formatTime(loginInfo.createdOn)}</span>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.item}>
          <span className={styles.value}>3666</span>
          <span>留言</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>66</span>
          <span>收藏</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>66</span>
          <span>评论</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>661</span>
          <span>留言</span>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
