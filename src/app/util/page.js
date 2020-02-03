export const getPageArr = page => {
  let pageArr = []
  for (let i = 1; i <= page; i++) {
    pageArr.push(i)
  }

  return pageArr
}

export const getPageName = (page, total) => {
  let start = (page - 1) * 35
  start = start === 0 ? 1 : start + 1
  let end = page * 35
  end = end > total ? total : page * 35
  return `${start}-${end}`
}
