const userInfoKey = "user-info";

/***
 * 保存用户的信息到本地
 * @param {Object} userInfo  用户登录成功的信息对象
 * @return {undefined} 无返回值
 */

export function saveInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
}

/**
 * 读取用户的本地信息
 * @return {String} 当前用户信息对象的字符串
 */

export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey);
}

/**
 * 获取本地存储中的用户令牌token
 * @return {string} 用户的ToKen令牌信息
 */

export function getToKen () {
  try {
    return JSON.parse(getUserInfo()).token;
  } catch (err) {
    return "";
  }
}

/**
 * 删除本地的用户信息
 * @return {undefined} 无返回值
 */

export function removUserInfo () {
  window.localStorage.removeItem(userInfoKey);
}
