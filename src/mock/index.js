const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')
const express = require('express')

alert(1)

const util = {
  getJsonFile: (filePath) => {
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    return JSON.parse(json)
  }
}

// 返回一个函数
module.exports = (app = express.Router()) => {
  // 监听http请求
  app.get('/mycoupon/list', (rep, res) => {
    const json = util.getJsonFile('./coupon/list.json')
    res.json(Mock.mock(json))
  })
}
