export const needLogin = (to, from, next) => {
  const _auth = localStorage.getItem('AUTH_TOKEN')
  if (_auth === null) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
}

export const needLoged = (to, from, next) => {
  const _auth = localStorage.getItem('AUTH_TOKEN')
  if (_auth === null) {
    next()
  } else {
    next({
      path: from.fullPath
    })
  }
}

// vue regexp 完美解决数字输入问题
/* eslint-disable */
export const numberOnly = (num, i, p) => {
  var i_max = i || 6
  var p_max = p || 2
  var val = num.toString().replace(/\s+/g, '')
  if (/^\.+.*$/.test(val)) val = ''
  val = val.replace(/[^\d\.]/, '')
  val = val.replace(/(^\d+\.{1})(\d*).*/g, '$1$2')
  val = val.replace(new RegExp("(^\\d+\\.\\d{" + p_max + "})\\d*", "g"), '$1')
  val = val.replace(/^[0]*(0{1})([1-9]*)(.*)/g, '$1$2$3')
  if (/^[0-9]*$/.test(val)) val = val.substring(0, i_max)
  if (/^0[1-9]+\.*\d*/g.test(val)) val = val.replace(/0([1-9]+)(.*)$/, '$1$2')
  return val
}

export const compressJSON = (value) => {
  let rs = value
  rs = rs.replace(/ /g, '')
  rs = rs.replace(/\r\n/g, '')
  rs = rs.replace(/\n/g, '')
  return rs
}
