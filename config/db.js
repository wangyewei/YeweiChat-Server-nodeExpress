/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-15 03:07:11
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: mongoose
 * @LastEditTime: 2020-09-22 17:43:44
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\config\db.js
 */
const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/yeweichat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', () => {
  console.info(`数据库野未聊天连接成功`)
})
module.exports = db;