/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-21 22:46:05
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: token
 * @LastEditTime: 2020-09-22 00:49:07
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\dao\jwt.js
 */

// 引入token
let jwt = require('jsonwebtoken')
// 生成token
let secret = 'YeweiChat'
exports.genrateToken = e => {
  let payload = {
    id: e,
    time: new Date()
  }
  let token = jwt.sign(payload, secret, {
    expiresIn: 60 * 60 * 24 * 120
  })
  return token
}
// 解码token
exports.verifyToken = e => {
  let payload = jwt.verify(e, secret)
  return payload
}