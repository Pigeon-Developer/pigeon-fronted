export const removeAllHtml = content => {
  let result
  result = content.replace(/<(.|\n)*?>/g, '')
  return result.slice(4)
}
