const Mock = require('mockjs')
const fs = require('fs') // 引入文件系统模块
const path = require('path') // 引入path模块

const util = {
  getJsonFile: (filePath) => {
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    return JSON.parse(json)
  }
}

// 返回一个函数
module.exports = (app) => {
  // 监听http请求
  app.get('/user/userinfo', (rep, res) => {
    const json = util.getJsonFile('./userInfo.json')
    res.json(Mock.mock(json))
  })
}
