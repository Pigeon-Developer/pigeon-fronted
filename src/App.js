import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.scss'

import { ToastProvider } from 'react-toast-notifications'
import allActions from 'src/actions'
import Home from './pages/home'
import Layout from 'src/app/components/layout'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // 请求用户信息
    dispatch(allActions.app.fetchUserInfo(dispatch))
  }, [dispatch])

  return (
    <ToastProvider autoDismiss autoDismissTimeout={3000}>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </ToastProvider>
  )
}

export default App
