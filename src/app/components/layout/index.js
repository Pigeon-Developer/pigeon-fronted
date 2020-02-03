import React from 'react'
import PropTypes from 'prop-types'

import Header from '../header'
import styles from './index.module.scss'

const Layout = props => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
