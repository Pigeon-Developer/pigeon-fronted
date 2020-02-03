import moment from 'moment'

export const formatTime = (unix, format = 'YYYY-MM-DD HH:mm') => {
  return moment.unix(unix).format(format)
}

export const formatTimeDay = (unix, format = 'YYYY-MM-DD') => {
  return moment.unix(unix).format(format)
}

export const secondToDate = result => {
  let res = ''
  const h = Math.floor(result / 3600)
  const m = Math.floor((result / 60) % 60)
  const s = Math.floor(result % 60)
  if (h > 0) {
    res = res + h + '时'
  }

  if (m > 0) {
    res = res + m + '分'
  }

  if (s >= 0) {
    res = res + s + '秒'
  }

  return res
}
