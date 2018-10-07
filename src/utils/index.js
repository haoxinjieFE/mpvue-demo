const basehost = 'https://58zmdjob.com:8070'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  console.log(date)
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  console.log(`${t1} ${t2}`)
  return `${t1} ${t2}`
}

const get = ({url, data, loading, isJson}) => new Promise((resolve, reject) => {
  const header = isJson ? {
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const sessionId = wx.getStorageSync('hkhadmin_sessionId')
  if (sessionId != null && sessionId !== '') {
    header.Cookie = 'hkhadmin_sessionId=' + sessionId
  }
  const clear = () => wx.hideLoading()
  if (loading) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
  }
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: header,
    success: res => {
      clear()
      resolve(res.data)
      const html = res.data
      if (typeof html === 'string' && html.substring(0, 15) === '<!DOCTYPE html>') {
        // 重新登录
        wx.showModal({
          title: '提示',
          content: '登录状态失效，请重新登录！',
          showCancel: false,
          success: function (res) {
            wx.clearStorageSync()
            goTo({
              url: '/pages/auth/main',
              type: 'relaunch'
            })
          }
        })
      }
      const sessionId = wx.getStorageSync('hkhadmin_sessionId')
      if (sessionId === '' || sessionId == null || sessionId) {
        var cookie = res.header['Set-Cookie']
        if (cookie != null) {
          var cookies = cookie.split(';')
          var sessionid = cookies[0].split('=')[1]
          if (sessionid !== 'deleteMe') { // 登陆出错的情况下会返回值为"deleteMe"的session_id
            wx.setStorageSync('hkhadmin_sessionId', sessionid)
          }
        }
      }
    },
    fail: error => {
      clear()
      reject(error)
    }
  })
})

const post = ({url, data, loading, isJson}) => new Promise((resolve, reject) => {
  const header = isJson ? {
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const sessionId = wx.getStorageSync('hkhadmin_sessionId')
  if (sessionId !== null && sessionId !== '') {
    header.Cookie = 'hkhadmin_sessionId=' + sessionId
  }

  const clear = () => wx.hideLoading()
  if (loading) {
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
  }

  wx.request({
    url: url,
    data: data,
    header: header,
    method: 'POST',
    success: res => {
      clear()
      resolve(res.data)
      const html = res.data
      if (typeof html === 'string' && html.substring(0, 15) === '<!DOCTYPE html>') {
        // 重新登录
        console.log('重新登录')
        wx.showModal({
          title: '提示',
          content: '登录状态失效，请重新登录！',
          showCancel: false,
          success: function (res) {
            wx.clearStorageSync()
            goTo({
              url: '/pages/index/main',
              type: 'relaunch'
            })
          }
        })
      }
      const sessionId = wx.getStorageSync('hkhadmin_sessionId')
      if (sessionId === '' || sessionId == null || sessionId) {
        var cookie = res.header['Set-Cookie']
        if (cookie != null) {
          var cookies = cookie.split(';')
          var sessionid = cookies[0].split('=')[1]
          if (sessionid !== 'deleteMe') { // 登陆出错的情况下会返回值为"deleteMe"的session_id
            wx.setStorageSync('hkhadmin_sessionId', sessionid)
          }
        }
      }
    },
    fail: error => reject(error)
  })
})

const chooseImage = (count, complete, isSave) => new Promise((resolve, reject) => {
  wx.chooseImage({
    count: count,
    complete: complete,
    success: file => {
      const fileList = file.tempFilePaths
      if (isSave) {
        fileList.forEach(item => wx.saveFile({
          tempFilePath: item,
          success: res => resolve(res),
          fail: error => reject(error)
        }))
      } else {
        resolve(file)
      }
    },
    fail: error => reject(error)
  })
})

const previewImage = ({current, imgList = [], complete = () => {}}) => new Promise((resolve, reject) => {
  wx.previewImage({
    current: current,
    urls: !imgList.length ? [...imgList, current] : imgList,
    complete: complete,
    success: res => resolve(res),
    fail: error => reject(error)
  })
})

const checkLogin = () => {
  wxStorage({
    key: 'USER_TYPE'
  }, 'get').then(data => {
    console.log(data)
    if (data.data === 1) {
      goTo({url: '/pages/index/main'})
    } else if (data.data === 2) {
      goTo({
        url: '/pages/merchant/main',
        type: 'relaunch'
      })
    } else {
      goTo({url: '/pages/auth/main'})
    }
  })
}

/**
 * @param url 跳转的地址
 * @param type 类型 nav = navigateTo tab = switchTab redirect = redirectTo navBack = navigateBack relaunch = reLaunch
 * 具体用法见：https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html
 */
const goTo = ({url, type = 'nav'}) => new Promise((resolve, reject) => {
  console.log('goto')
  switch (type) {
    case 'nav':
      wx.navigateTo({
        url: url,
        success: data => resolve(data),
        fail: err => reject(err)
      })
      break
    case 'tab':
      wx.switchTab({
        url: url,
        success: data => resolve(data),
        fail: err => reject(err)
      })
      break
    case 'redirect':
      wx.redirectTo({
        url: url,
        success: data => resolve(data),
        fail: err => reject(err)
      })
      break
    case 'navBack':
      console.log(url)
      wx.navigateBack({
        url: url
      })
      break
    case 'relaunch':
      wx.reLaunch({
        url: url,
        success: data => resolve(data),
        fail: err => reject(err)
      })
      break
    default:
      return new Error('not support type !')
  }
}
)

const login = (timeout) => new Promise((resolve, reject) => {
  wx.login({
    success: data => resolve(data),
    fail: err => reject(err)
  })
})
/**
 * @param key 本地缓存中的指定的 key String
 * @param data 需要存储的内容 Object/String
 * @param method set/get 调用 setStorage/getStorage String
 */
const wxStorage = ({key, data}, method) => new Promise((resolve, reject) => {
  if (method === 'get') {
    wx.getStorage({
      key: key,
      success: errMsg => resolve(errMsg),
      fail: error => reject(error)
    })
  } else if (method === 'set') {
    wx.setStorage({
      key: key,
      data: data,
      success: errMsg => resolve(errMsg),
      fail: error => reject(error)
    })
  }
})

const openScanCode = (complete) => new Promise((resolve, reject) => {
  wx.scanCode({
    onlyFromCamera: true,
    scanType: 'qrCode',
    success: data => resolve(data),
    fail: error => reject(error),
    complete: complete
  })
})

const authorize = ({scope, complete = () => {}}) => new Promise((resolve, reject) => {
  wx.authorize({
    scope: `scope.${scope}`,
    success: data => resolve(data),
    fail: err => reject(err),
    complete: complete
  })
})
// 打开内置导航方法
const navigateRoad = ({scale = 18, chooseComplete = () => {}, openComplete = () => {}}) => new Promise((resolve, reject) => {
  wx.chooseLocation({
    success: data => {
      wx.openLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.name,
        scale: scale,
        address: data.address,
        success: data => resolve(data),
        fail: err => reject(err),
        complete: openComplete
      })
    },
    fail: err => reject(err),
    complete: chooseComplete
  })
})

const signMsg = {
  200: '成功',
  101: '身份不符合，未参加本次兼职',
  102: '已经签到',
  103: '已经签退',
  104: '已经结束',
  105: '已经结束'

}

export {
  formatNumber,
  formatTime,
  post,
  get,
  chooseImage,
  previewImage,
  goTo,
  login,
  wxStorage,
  basehost,
  openScanCode,
  checkLogin,
  authorize,
  navigateRoad,
  signMsg
}
