const express = require('express')
const request = require('request')
const MockJS = require('mockjs')
const bodyParser = require('body-parser')
const config = require('./config')
const decrypt = require('./decrypt')

// 这个可能要根据自己的 appid 和 appsecret 改
const appid = 'wx309baa77e8b7ed4b'
const secret = 'c414dbcc299aa5d5fc49a998a0033efd'
const app = express()
const port = 3001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
Object.keys(config).forEach(key => {
  const api = key.split(' ')
  const type = api[0].toLowerCase()
  const url = api[1]

  app[type](url, (req, res) => {
    // 服务端允许跨域请求
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.json({
      errno: 0,
      errmsg: 'success',
      // errno: 3002,
      // errmsg: 'token失效',
      ...MockJS.mock(config[key])
    })
  })
})

app['post']('/api/user', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  const {code, encryptedData, iv} = req.body
  request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, (error, response, body) => {
    if (error) {
      console.log(error)
    }
    const data = JSON.parse(body)
    res.json({
      ...decrypt({
        appId: appid,
        sessionKey: data.session_key,
        encryptedData: encryptedData,
        iv: iv
      })
    })
  })
})
app['post']('/api/merchant-login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  const {account, password} = req.body
  if (account === '1234' && password === '1234') {
    res.json({
      errcode: 0,
      errmsg: 'success'
    })
  } else {
    res.json({
      errcode: 1,
      errmsg: 'fail'
    })
  }
})
app.listen(port, () => console.log(`😄 Mock server is listening on port ${port}`))
