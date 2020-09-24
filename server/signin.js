/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-21 23:00:26
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2020-09-22 01:00:31
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\server\signin.js
 */
//用户登录
let dbserver = require('../dao/dbserver')
// 引入token
let jwt = require('../dao/jwt')
exports.signIn = (req, res) => {
  let data = req.body.data
  let pwd = req.body.pwd

  dbserver.userMatch(data, pwd, res)
}

// token测试
// exports.test = (req, res) => {
//   let token = req.body.token
//   let jg = jwt.verifyToken(token)
//   return res.send(jg)
//   // dbserver.userMatch(data, pwd, res)
// }