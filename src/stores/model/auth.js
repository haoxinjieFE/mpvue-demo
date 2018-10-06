import { FETCH_USER, MERCHANT_LOGIN } from '../mutation-types'
import {post, basehost, wxStorage, goTo} from '@/utils'
const state = {
  user: {},
  merchant: {}
}
const actions = {
  [FETCH_USER] ({state, commit}, params) {
    post({url: `${basehost}/app/login/appWxLogin`, data: params}).then(data => {
      console.log(data)
      commit(FETCH_USER, data.data)
      wxStorage({key: 'USER_TYPE', data: data.data.type}, 'set')
      wxStorage({key: 'USERINFO', data: data.data}, 'set')
      goTo({
        url: '/pages/index/main',
        type: 'tab'
      })
    })
  },
  [MERCHANT_LOGIN] ({state, commit}, params) {
    post({url: `${basehost}/app/login/appLogin`, data: params}).then(
      data => {
        console.log(data)
        commit(MERCHANT_LOGIN, data.data)
        wxStorage({key: 'USER_TYPE', data: data.data.type}, 'set')
        goTo({
          url: '/pages/merchant/main'
        })
      }
    )
  }
}
const mutations = {
  [FETCH_USER] (state, payload) {
    state.user = {...payload}
  },
  [MERCHANT_LOGIN] (state, payload) {
    state.merchant = {...payload}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
