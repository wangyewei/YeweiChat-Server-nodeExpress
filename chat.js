/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-15 02:29:10
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 入口文件
 * @LastEditTime: 2020-09-22 01:45:11
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\chat.js
 */

// 引入解析req.body插件
let bodyParser = require('body-parser')
// 引入token
let jwt = require('./dao/jwt')
const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('hello express!'))

// 允许跨域配置 可以用cors
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Method', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 解析前端数据

app.use(bodyParser.json())

// 导入路由文件
require('./router/index')(app);
// token判断
app.use((req, res, next) => {
  if (typeof (req.body.token) != 'undefined') {
    // 处理token
    let token = req.body.token
    let tokenMatch = jwt.verifyToken(token)
    console.log('及时' + tokenMatch)
  } else {
    next()
  }
})
// 404 页面
app.use((req, res, next) => {
  let err = new Error('404 Not Found')
  err.status = 404;
  next(err);
})
// 500 页面
app.use((err, req, res, next) => {
  res.status = (err.status || 500)
  return res.send(err.message)
})

app.listen(port, () => console.log(`服务器已经启动，端口号为： ${port}!`))