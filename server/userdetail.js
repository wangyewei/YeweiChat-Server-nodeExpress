/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-22 17:13:33
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 好友详情服务
 * @LastEditTime: 2020-09-23 03:07:01
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\server\userdetail.js
 */
// 用户详情
let dbserver = require('../dao/dbserver')
exports.userDetail = (req, res) => {
  let id = req.body.id
  dbserver.userDetail(id, res)
}

// 用户信息修改
exports.userUpdate = (req, res) => {
  let data = req.body
  dbserver.userUpdate(data, res)
}
// 修改好友昵称
exports.getMarkName = (req, res) => {
  let data = req.body
  dbserver.getMarkName(data, res)
}

// 修改好友昵称
exports.friendMarkName = (req, res) => {
  let data = req.body
  dbserver.friendMarkName(data, res)
}