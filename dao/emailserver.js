/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-20 22:46:52
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 邮箱服务
 * @LastEditTime: 2020-09-21 23:41:43
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\dao\emailserver.js
 */
let nodemailer = require('nodemailer')
let credentials = require('../config/credentials')
// 创建传输方式

let transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass
  }
})
// 注册发送邮件给用户
exports.emailSignUp = (email, res) => {
  // 发送消息内容
  let options = {
    from: '826036140@qq.com',
    to: email,
    subject: '感谢您在野未聊天注册',
    html: '<span><a href="http://localhost:8080>野未聊天欢迎您的加入</a></span>'
  }
  // 发送邮件
  transporter.sendMail(options, (err, msg) => {
    if (err) {
      console.log('发送失败', err)
      return res.send(err)
    } else {
      console.log('邮箱发送成功！')
      return res.send('邮箱发送成功')
    }
  })
}