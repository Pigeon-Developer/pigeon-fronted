import React from 'react'

import { Banner, UserInfo } from 'src/app/components'

const Home = () => {

  return (
    <div className='container'>
      <div className='columns'>
        <div className='column col-8 col-sm-12'>
          <Banner />
        </div>
        <div className='column col-4 col-sm-12'>
          <UserInfo />
        </div>
      </div>
    </div>
  )
}

export default Home
