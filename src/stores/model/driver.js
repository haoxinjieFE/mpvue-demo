import { FETCH_DRIVER, ENROLL } from '../mutation-types'
import { get, post, basehost } from '@/utils'

const state = {
  drivers: []
}

const actions = {
  [FETCH_DRIVER] ({state, commit}) {
    get({
      url: `${basehost}/app/driving/getDriving`,
      loading: true
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
  }
}

const mutations = {
  [FETCH_DRIVER] (state, payload) {
    state.drivers = payload.data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
