import Vue from 'vue'

/* eslint-disable */
Date.prototype.format = function (format) {
  let o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1, RegExp.$1.length == 1
        ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length))
  return format
}

Vue.filter('hash', (value) => {
  return value ? value.toString().replace(/^(\d{3})(.*)(\d{3})/, '$1***$3') : value
})

Vue.filter('date', (value, f2 = 'yyyy-MM-dd') => {
  return value ? new Date(value).format(f2) : '--'
})
Vue.filter('datetime', (value, f2 = 'yy-MM-dd hh:mm:ss') => {
  return value ? new Date(value).format(f2) : '--'
})
Vue.filter('MMDDHHmm', (value, f2 = 'MM-dd hh:mm') => {
  return value ? new Date(value).format(f2) : '--'
})
Vue.filter('fulldatetime', (value) => {
  return value ? new Date(value).format('yyyy-MM-dd hh:mm:ss') : '--'
})
Vue.filter('floor6', (value) => {
  return (Math.floor(value * 1000000) / 1000000) || 0
})
Vue.filter('floor8', (value) => {
  return (Math.floor(value * 100000000) / 100000000) || 0
})
Vue.filter('addorminus', (value) => {
  const _config = {
    add: '+',
    minus: '-'
  }
  return _config[value] || ''
})
