import React from 'react'
import classNames from 'classnames'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  TiHome,
  TiVideo,
  TiThLargeOutline,
  TiBook,
  TiFolder,
  TiNotes,
} from 'react-icons/ti'

import styles from './index.module.scss'

const MENU_LIST = [
  {
    name: '首页',
    link: '/',
    icon: () => <TiHome />,
  },
  {
    name: '题库',
    link: '/problems',
    icon: () => <TiVideo />,
  },
  {
    name: '比赛',
    link: '/contests',
    icon: () => <TiThLargeOutline />,
  },
  {
    name: '评测',
    link: '/submissions',
    icon: () => <TiNotes />,
  },
  {
    name: '学习',
    link: '/study',
    icon: () => <TiBook />,
  },
  {
    name: '排名',
    link: '/ranklist',
    icon: () => <TiFolder />,
  },
]

const Header = ({ location }) => {
  const { loginInfo, count } = useSelector(state => state.app)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.logo}>Pigeon OJ</span>
          <div className={classNames(styles.menu, 'hide-sm')}>
            {/* eslint-disable-next-line array-callback-return */}
            {MENU_LIST.map((item, index) => (
              <Link
                className={classNames(
                  styles.item,
                  location.pathname === item.link ? styles.active : '',
                )}
                key={index}
                to={item.link}
              >
                {item.icon()}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <Link to='/space'>
            <figure
              data-badge={count && count.unReadNotifyCount}
              className={classNames(
                'avatar avatar-lg',
                count && count.unReadNotifyCount > 0 ? 'badge' : '',
              )}
            >
              <img
                className={styles.avatar}
                src={
                  loginInfo.avatarUrl && (loginInfo.avatarUrl.indexOf('http') === -1
                    ? `http://online.njtech.edu.cn${loginInfo.avatarUrl}`
                    : loginInfo.avatarUrl)
                }
                alt=''
              />
            </figure>
          </Link>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(Header)
