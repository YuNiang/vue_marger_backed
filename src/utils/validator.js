/* eslint-disable */
const reg = {
  mobile: /^1(3|4|5|7|8)[0-9]\d{8}$/,
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  password: /^[\@A-Za-z0-9\!\@\#\$\%\^\&\*\.\_\-\~]{6,22}$/,
  code: /^\d{6}$/
}

// 验证手机规则
export const checkUsername = (rule, value, callback) => {
  const _require = rule.requireMsg
  const _error = rule.errorMsg
  const _testMobile = reg.mobile.test(value)
  const _testEmail = reg.email.test(value)

  if (!value) {
    return callback(new Error(_require))
  }

  if (!_testMobile && !_testEmail) {
    callback(new Error(_error))
  } else {
    callback()
  }
}

// 验证密码
export const checkPassword = (rule, value, callback) => {
  const _require = rule.requireMsg
  const _error = rule.errorMsg
  const _test = reg.password.test(value)

  if (!value) {
    return callback(new Error(_require))
  }

  if (!_test) {
    callback(new Error(_error))
  } else {
    callback()
  }
}

// 验证手机号
export const checkMobile = (rule, value, callback) => {
  const _require = rule.requireMsg
  const _error = rule.errorMsg
  const _test = reg.mobile.test(value)

  if (!value) {
    return callback(new Error(_require))
  }

  if (!_test) {
    callback(new Error(_error))
  } else {
    callback()
  }
}

// 验证邮箱
export const checkEmail = (rule, value, callback) => {
  const _require = rule.requireMsg
  const _error = rule.errorMsg
  const _test = reg.email.test(value)

  if (!value) {
    return callback(new Error(_require))
  }

  if (!_test) {
    callback(new Error(_error))
  } else {
    callback()
  }
}

// 验证验证码
export const checkCode = (rule, value, callback) => {
  const _require = rule.requireMsg
  const _error = rule.errorMsg
  const _test = reg.code.test(value)

  if (!value) {
    return callback(new Error(_require))
  }

  if (!_test) {
    callback(new Error(_error))
  } else {
    callback()
  }
}
