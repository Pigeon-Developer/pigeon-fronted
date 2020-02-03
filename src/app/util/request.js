import axios from 'axios'
import * as R from 'ramda'

const BASE_URL_MAP = {
  // local: 'http://online.njtech.edu.cn/test',
  development: 'http://localhost:8000/api/v1',
  local: 'http://127.0.0.1:3000/api',
  production: 'http://online.njtech.edu.cn/api',
  dev: 'http://online.njtech.edu.cn/test',
}
const BASE_URL = BASE_URL_MAP[process.env.NODE_ENV]

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 1000000,
  withCredentials: true,
  validateStatus: function(status) {
    return status < 5000
  },
})

request.interceptors.response.use(
  response => {
    const res = response.data
    if ([10001, 10002, 10003].indexOf(res.code) !== -1) {
      window.location = res.data.redirectUri
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  },
)

const stringify = dict => {
  const result = []
  for (let key in dict) {
    if (!dict.hasOwnProperty(key)) {
      continue
    }
    // 所有空值和 -1 将被删除
    if (!R.isEmpty(dict[key]) && dict[key] !== -1) {
      result.push(`${key}=${encodeURIComponent(dict[key])}`)
    }
  }
  return result.join('&')
}

export function get(url, params = {}) {
  const query = stringify(params)
  const _url = `${url}${query && `?${query}`}`
  return new Promise((resolve, reject) => {
    request
      .get(_url)
      .then(res => {
        if (res.code !== 200) {
          resolve(false)
        } else {
          resolve(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    request
      .post(url, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.code !== 200) {
          resolve({
            status: false,
            msg: res.msg,
          })
        } else {
          resolve({
            status: true,
            data: res.data,
          })
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export default {
  get,
  post,
}
