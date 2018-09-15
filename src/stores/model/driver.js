import { FETCH_DRIVER } from '../mutation-types'
import { get, basehost } from '@/utils'
const state = {
  drivers: []
}

const actions = {
  [FETCH_DRIVER] ({state, commit}) {
    get({
      url: `${basehost}/api/driver`,
      loading: true
    }).then((res) => {
      console.log(res.data)
      commit(FETCH_DRIVER, {data: res.data})
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
