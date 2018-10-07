import { FETCH_LOST, FETCH_MORE, RESET_LIST } from '../mutation-types'
import { get, basehost, formatTime } from '@/utils'
const state = {
  losts: {},
  pageNum: 1,
  pageSize: 10
}

const actions = {
  [FETCH_LOST] ({state, commit}, params) {
    if (params && params.reLoad) {
      commit(RESET_LIST)
    }
    get({
      url: `${basehost}/app/lost/getLostres`,
      loading: true,
      data: {pageNum: state.pageNum, pageSize: state.pageSize}
    }).then((res) => {
      commit(FETCH_LOST, res.data)
    })
  },
  [FETCH_MORE] ({state, dispatch, commit}) {
    if (!state.losts.isLastPage) {
      state.pageNum = state.pageNum + 1
      dispatch('FETCH_LOST')
    }
  }
}

const mutations = {
  [FETCH_LOST] (state, payload) {
    payload.list.forEach(item => { item.createTime = formatTime(item.createTime) })
    state.losts = !state.losts.list ? {...payload} : {...payload, list: [...state.losts.list, ...payload.list]}
  },
  [RESET_LIST] (state, payload) {
    state.losts.list = []
    state.pageNum = 1
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
