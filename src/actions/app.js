import request from 'src/app/util/request'
import allActions from './index'

const setLogin = login => ({
  type: 'SET_LOGIN',
  payload: login,
})

const fetchUserInfo = dispatch => async () => {
  const res = await request.get('/user/detail')
  dispatch(allActions.app.setLogin(res))
}

export default {
  setLogin,
  fetchUserInfo
}
