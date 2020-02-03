const initState = {
  loginInfo: {},
}

const app = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        loginInfo: {
          ...action.payload,
        },
      }
    case 'LOG_OUT':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export default app
