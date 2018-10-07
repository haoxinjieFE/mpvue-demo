import { FETCH_DRIVER, ENROLL, FETCH_MORE, RESET_LIST } from '../mutation-types'
import { get, post, basehost, formatTime } from '@/utils'

const state = {
  drivers: {},
  pageNum: 1,
  pageSize: 10
}

const actions = {
  [FETCH_DRIVER] ({state, commit}, params) {
    if (params && params.reLoad) {
      commit(RESET_LIST)
    }
    get({
      url: `${basehost}/app/driving/getDriving`,
      loading: true,
      data: {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
    }).then((res) => {
      commit(FETCH_DRIVER, {data: res.data})
    })
  },
  [ENROLL] ({state, commit}, params) {
    return new Promise((resolve, reject) => {
      post({
        url: `${basehost}/app/userDriving/enrollDriving`,
        data: params
      }).then(data => {
        resolve(data)
      })
    })
  },
  [FETCH_MORE] ({state, dispatch, commit}) {
    if (!state.drivers.isLastPage) {
      state.pageNum = state.pageNum + 1
      dispatch('FETCH_DRIVER')
    }
  }
}

const mutations = {
  [FETCH_DRIVER] (state, payload) {
    payload.data.list.forEach(item => { item.serverTime = formatTime(item.serverTime) })
    state.drivers = !state.drivers.list ? {...payload.data} : {...payload.data, list: [...state.drivers.list, ...payload.data.list]}
  },
  [RESET_LIST] (state, payload) {
    state.drivers.list = []
    state.pageNum = 1
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
