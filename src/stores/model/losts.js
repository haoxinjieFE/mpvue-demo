import { FETCH_LOST } from '../mutation-types'
import { get, basehost, formatTime } from '@/utils'
const state = {
  losts: {},
  pageNum: 1,
  pageSize: 10
}

const actions = {
  [FETCH_LOST] ({state, commit}) {
    get({
      url: `${basehost}/app/lost/getLostres`,
      loading: true,
      data: {pageNum: state.pageNum, pageSize: state.pageSize}
    }).then((res) => {
      commit(FETCH_LOST, res.data)
    })
  }
}

const mutations = {
  [FETCH_LOST] (state, payload) {
    payload.list.forEach(item => { item.createTime = formatTime(item.createTime) })
    state.losts = {...payload}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
