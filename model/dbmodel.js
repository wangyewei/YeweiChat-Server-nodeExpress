/*
 * @Autor: YeWei Wang
 * @Date: 2020-09-15 03:10:44
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: schema
 * @LastEditTime: 2020-09-21 18:07:21
 * @Version: 1.0
 * @FilePath: \YeweiChat-Server-express\model\dbmodel.js
 */
const mongoose = require('mongoose')
const { model } = require('../config/db')
const db = require('../config/db')
let Schema = mongoose.Schema

// 用户表
let UserSchema = new Schema({
  name: { type: String },                       // 用户名
  psw: { type: String },                        // 密码
  email: { type: String },                      // 邮箱
  sex: { type: String, default: 'asexual' },    // 性别
  birth: { type: Date },                        // 生日
  phone: { type: Number },                      // 电话
  explain: { type: String },                    // 介绍
  imgUrl: { type: String, default: 'user.png' },// 头像
  time: { type: Date }                          // 注册时间
})

// 好友表
let FriendSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },   // 用户id
  friendID: { type: Schema.Types.ObjectId, ref: 'User' }, // 好友id
  state: { type: Number },                                // 通过状态 0申请中 1好友 2发送方
  markname: { type: String },                              // 昵称
  time: { type: Date }                                    // 生成时间
})

// 一对一消息表
let messageSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' },  // 用户id
  friendID: { type: Schema.Types.ObjectId, ref: 'User' },// 好友id
  message: { type: String },                             // 内容
  types: { type: String },                               // 内容类型 0文字 1图片链接 2音频链接...
  time: { type: String },                                // 发送时间
  state: { type: Number }                                // 消息状态 0已读 1未读
})

// 群表
let GroupSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
  name: { type: String },                               // 群名称
  imgUrl: { type: String, default: 'user.png' },        // 群头像
  time: { type: Date },                                 // 创建时间
  notice: { type: String }                              // 公告
})

// 群成员表
let GroupMenberSchema = new Schema({
  groupID: { type: Schema.Types.ObjectId, ref: 'Group' },  // 群id
  userID: { type: Schema.Types.ObjectId, ref: 'User' },    // 用户id
  name: { type: String },                                  // 群内名称
  tip: { type: Number, default: 0 },                       // 未读消息数
  time: { type: Date },                                    // 发送时间
  shield: { type: Number }                                 // 是否屏蔽群消息 0否 1是
})

// 群消息表
let GroupMsgSchema = new Schema({
  groupID: { type: Schema.Types.ObjectId, ref: 'Group' },  // 群id
  userID: { type: Schema.Types.ObjectId, ref: 'User' },    // 用户id
  message: { type: String },                               // 内容 
  types: { type: String },                                 // 内容类型 0文字 1图片链接 2音频链接...
  time: { type: Date }                                     // 发送时间
})

module.exports = db.model('User', UserSchema)
module.exports = db.model('Friend', FriendSchema)
module.exports = db.model('Message', messageSchema)
module.exports = db.model('Group', GroupSchema)
module.exports = db.model('GruopMenber', GroupMenberSchema)
module.exports = db.model('GroupMsg', GroupMsgSchema)
