import { FETCH_LOST } from '../mutation-types'
import { get, basehost } from '@/utils'
const state = {
  losts: []
}

const actions = {
  [FETCH_LOST] ({state, commit}) {
    get({
      url: `${basehost}/api/losts`,
      loading: true
    }).then((res) => {
      commit(FETCH_LOST, res.data)
    })
  }
}

const mutations = {
  [FETCH_LOST] (state, payload) {
    state.losts = [...payload]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
