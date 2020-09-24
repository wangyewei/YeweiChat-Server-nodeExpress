/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-21 18:25:09
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 密码传输加密
 * @LastEditTime: 2020-09-21 18:28:41
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\dao\bcrypt.js
 */
let bcrypt = require('bcryptjs')

// 生成hash密码
exports.encryption = e => {
  // 生成随机的slat
  let salt = bcrypt.genSaltSync(10)
  // 生成hash密码
  let hash = bcrypt.hashSync(e, salt)
  return hash
}

// 解密
exports.verifcation = (e, hash) => {
  let verif = bcrypt.compareSync(e, hash)
  return verif
}