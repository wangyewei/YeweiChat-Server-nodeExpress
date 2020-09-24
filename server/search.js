/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-22 01:21:58
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 搜索服务
 * @LastEditTime: 2020-09-22 01:26:32
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\server\search.js
 */
let dbserver = require('../dao/dbserver')

// 用户搜索
exports.searchUser = (req, res) => {
  let data = req.body.data
  dbserver.searchUser(data, res)
}

//判断是否为好友
exports.isFriend = (req, res) => {
  let uid = req.body.uid
  let fid = req.body.fid
  dbserver.isFriend(uid, fid, res)
}

// 搜索群
exports.searchGroup = (req, res) => {
  let data = req.body.data
  dbserver.searchGroup(data, res)
}

//判断是否在群内
exports.isInGroup = (req, res) => {
  let uid = req.body.uid
  let gid = req.body.gid
  dbserver.isInGroup(uid, gid, res)
}