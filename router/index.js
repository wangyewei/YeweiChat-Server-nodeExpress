/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-15 02:46:03
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 路由
 * @LastEditTime: 2020-09-23 03:06:22
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\router\index.js
 */

const dbserver = require('../dao/dbserver')
// 引入邮箱发送方法
let emailserver = require('../dao/emailserver')
// 注册页面服务
let signup = require('../server/signup')
// 登陆页面服务
let signin = require('../server/signin')
// 搜索页面服务
let search = require('../server/search')
// 详情页面服务
let user = require('../server/userdetail')


const {
  sign
} = require('cookie-signature')
module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send('hello test pages')
    // dbserver.findUser(res)
  })
  // 邮箱测试
  app.post('/mail', (req, res) => {
    let mail = req.body.mail
    emailserver.emailSignUp(mail, res)
  })

  /** 注册页面*/
  // 注册
  app.post('/signup/add', (req, res) => {
    signup.signUp(req, res)
  })
  // 用户名是否被占用判断
  app.post('/signup/judge', (req, res) => {
    signup.judgeValue(req, res)
  })

  /**登陆页面 */
  //登陆
  app.post('/signin/match', (req, res) => {
    signin.signIn(req, res)
  })
  // token 测试
  // app.post('/sign/test', (req, res) => {
  //   signin.test(req, res)
  // })

  /** 搜索页面*/
  // 搜索用户
  app.post('/search/user', (req, res) => {
    search.searchUser(req, res)
  })
  // 判断是否为好友
  app.post('/search/isfriend', (req, res) => {
    search.isFriend(req, res)
  })
  // 搜索群
  app.post('/search/group', (req, res) => {
    search.searchGroup(req, res)
  })
  // 判断是否为好友
  app.post('/search/isingroup', (req, res) => {
    search.isInGroup(req, res)
  })

  /**用户详情 */
  // 详情
  app.post('/user/detail', (req, res) => {
    user.userDetail(req, res)
  })
  // 用户信息修改
  app.post('/user/update', (req, res) => {
    user.userUpdate(req, res)
  })
  // 好友昵称修改
  app.post('/user/markname', (req, res) => {
    user.friendMarkName(req, res)
  })
  // 好友昵称获取
  app.post('/user/getmarkname', (rea, res) => {
    user.getMarkname(req, res)
  })
}