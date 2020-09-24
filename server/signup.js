/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-21 18:39:09
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 注册页面后台
 * @LastEditTime: 2020-09-21 19:00:44
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\server\signup.js
 */
let dbserver = require('../dao/dbserver')

// 用户注册
exports.signUp = (req, res) => {
  let name = req.body.name
  let mail = req.body.mail
  let pwd = req.body.pwd

  dbserver.buildUser(name, mail, pwd, res)
}

// 用户邮箱是否被占用判断
exports.judgeValue = (req, res) => {
  let data = req.body.data
  let type = req.body.type
  dbserver.countUserValue(data, type, res)
}