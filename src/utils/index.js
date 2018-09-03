const basehost = 'http://localhost:3001'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const get = (url, data, timeout) => new Promise((resolve, reject) => {
  wx.requestTimer = setTimeout(() => reject(new Error('fetch timeout!')), timeout || 10000)
  const clear = () => clearInterval(wx.requestTimer)
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    success: res => {
      clear()
      resolve(res.data)
    },
    fail: error => {
      clear()
      reject(error)
    }
  })
})

const post = (url, data) => new Promise((resolve, reject) => {
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    success: res => resolve(res.data),
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

const previewImage = (urls, complete) => new Promise((resolve, reject) => {
  wx.previewImage({
    urls: urls,
    complete: complete,
    success: res => resolve(res),
    fail: error => reject(error)
  })
})

/**
 * @param url 跳转的地址
 * @param type 类型 nav = navigateTo tab = switchTab redirect = redirectTo navBack = navigateBack relaunch = reLaunch
 * 具体用法见：https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html
 */
const goTo = ({url, type = 'nav'}) => new Promise((resolve, reject) => {
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
    timeout: timeout,
    success: errMsg => resolve(errMsg),
    fail: err => reject(err)
  })
})
/**
 * @param key 本地缓存中的指定的 key String
 * @param data 需要存储的内容 Object/String
 * @param method set/get 调用 setStorage/getStorage String
 */
const wxStorage = ({key, data}, method) => new Promise((resolve, reject) => {
  console.log(key, data)
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
  openScanCode
}
