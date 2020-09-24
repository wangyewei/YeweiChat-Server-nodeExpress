/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-15 03:14:09
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: db模型操作
 * @LastEditTime: 2020-09-23 03:43:20
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\dao\dbserver.js
 */

// 引入加密文件
let bcrypt = require('./bcrypt')
// 引入token
let jwt = require('./jwt')

let dbmodel = require('../model/dbmodel')

let User = dbmodel.model('User')
let Friend = dbmodel.model('Friend')
let Group = dbmodel.model('Group')
let GroupMenber = dbmodel.model('GruopMenber')
// 新建用户
exports.buildUser = (name, email, pwd, res) => {
  // 密码加密
  let password = bcrypt.encryption(pwd)

  let data = {
    name: name,
    email: email,
    psw: password,
    time: new Date()
  }

  let user = new User(data)
  user.save((err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      return res.send({
        status: 200
      })
    }
  })
}

// 匹配用户表元素个数
exports.countUserValue = (data, type, res) => {
  let wherestr = {}
  wherestr[type] = data
  User.countDocuments(wherestr, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      return res.send({
        status: 200,
        result
      })
    }
  })
}
// 验证用户
exports.userMatch = (data, pwd, res) => {
  let wherestr = {
    $or: [{
      'name': data
    }, {
      'email': data
    }]
  }
  let out = {
    'name': 1,
    'imgUrl': 1,
    'psw': 1
  }

  User.find(wherestr, out, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      if (result == '') {
        return res.send({
          status: 400
        })
      }
      result.map(e => {
        const pwdMatch = bcrypt.verifcation(pwd, e.psw)
        if (pwdMatch) {
          let token = jwt.genrateToken(e._id)
          let back = {
            id: e._id,
            name: e.name,
            imgUrl: e.imgUrl,
            token: token,
          }
          return res.send({
            status: 200,
            back
          })
        } else {
          return res.send({
            status: 300,
            msg: '账号或密码错误'
          })
        }
      })
    }
  })
}

//搜索用户
exports.searchUser = (data, res) => {
  let wherestr;
  if (data == 'yewei') {
    wherestr = {}
  } else {
    wherestr = {
      $or: [{
        'name': {
          $regex: data
        }
      }, {
        'email': {
          $regex: data
        }
      }]
    }
  }
  let out = {
    'name': 1,
    'email': 1,
    'imgUrl': 1,
    'psw': 1
  }
  User.find(wherestr, out, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      return res.send({
        status: 200,
        result
      })
    }
  })
}

// 判断是否为好友
exports.isFriend = (uid, fid, res) => {
  let wherestr = {
    'userID': uid,
    'friendID': fid,
    'state': 0
  }
  Friend.findOne(wherestr, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      if (result) {
        return res.send({
          status: 200,
          tip: 1
        })
      } else {
        return res.send({
          status: 400
        })
      }
    }
  })
}

// 搜索群
exports.searchGroup = (data, res) => {
  if (data == 'yewei') {
    let wherestr = {}
  } else {
    let wherestr = {
      'name': {
        $regex: data
      }
    }
  }
  let out = {
    'name': 1,
    'imgUrl': 1
  }
  Group.find(wherestr, out, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      return res.send({
        status: 200,
        result
      })
    }
  })
}

// 判断是否在群内
exports.isInGroup = (uid, gid, res) => {
  let wherestr = {
    'userID': uid,
    'groupID': gid,
  }
  GroupMenber.findOne(wherestr, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      if (result) {
        return res.send({
          status: 200
        })
      } else {
        return res.send({
          status: 400
        })
      }
    }
  })
}

// 用户详情
exports.userDetail = (id, res) => {
  let wherestr = {
    '_id': id
  }
  let out = {
    'psw': 0
  }
  User.findOne(wherestr, out, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      if (result) {
        return res.send({
          status: 200,
          result
        })
      } else {
        return res.send({
          status: 400
        })
      }
    }
  })
}

// 用户信息修改

function update(data, update, res) {
  User.findByIdAndUpdate(data, update, (err, resu) => {
    if (err) {
      return res.send({
        // 修改失败
        status: 500,
        msg: '修改失败，稍后再试'
      })
    } else {
      return res.send({
        // 修改成功
        status: 200,
        msg: '修改成功'
      })
    }
  })
}

exports.userUpdate = (data, res) => {
  let updatestr = {}
  // 判断是否有密码项
  if (typeof (data.pwd) != 'undefined') {
    User.find({
      '_id': data.id
    }, {
      'psw': 1
    }, (err, result) => {
      if (err) {
        return res.send({
          status: 500
        })
      } else {
        if (result == '') {
          return res.send({
            status: 400,
          })
        }
        result.map(e => {
          const pwdMatch = bcrypt.verifcation(data.pwd, e.psw)
          if (pwdMatch) {
            // 密码验证成功
            // 如果为修改密码 先加密
            if (data.type == 'psw') {
              let password = bcrypt.encryption(data.data)
              updatestr[data.type] = password
            } else {
              // 邮箱匹配
              updatestr[data.type] = data.data
              User.countDocuments(updatestr, (err, result) => {
                if (err) {
                  return res.send({
                    status: 500
                  })
                } else {
                  if (result == 0) {
                    // 没有匹配项，可以修改
                    update(data.id, updatestr, res)
                  } else {
                    // 已存在
                    return res.send({
                      status: 300,
                      msg: '邮箱已注册'
                    })
                  }
                }
              })
            }
          } else {
            // 密码匹配失败
            return res.send({
              status: 400,
              msg: '现密码错误'
            })
          }
        })
      }
    })
  } else if (data.type == 'name') {
    // 如果是用户名先进行匹配
    updatestr[data.type] = data.data
    User.countDocuments(updatestr, (err, result) => {
      if (err) {
        return res.send({
          status: 500
        })
      } else {
        if (result == 0) {
          // 没有匹配项，可以修改
          update(data.id, updatestr, res)
        } else {
          // 已存在
          return res.send({
            status: 300,
            msg: '用户名已注册'
          })
        }
      }
    })
  } else {
    // 一般项修改
    updatestr[data.type] = data.data
    update(data.id, updatestr, res)
  }
}

// 获取好友昵称
exports.getMarkName = (data, res) => {
  let wherestr = {
    'userID': data.uid,
    'friendID': data.fid
  }
  let out = {
    'markname': 1
  }
  Friend.findOne(wherestr, out, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      return res.send({
        status: 200,
        result
      })
    }
  })
}

// 好友昵称修改
exports.friendMarkName = (data, res) => {
  let wherestr = {
    'userID': data.uid,
    'friendID': data.fid
  }
  let uodatestr = {
    'markname': data.name
  }
  Friend.updateOne(wherestr, updatestr, (err, result) => {
    if (err) {
      return res.send({
        status: 500
      })
    } else {
      return res.send({
        status: 200
      })
    }
  })
}