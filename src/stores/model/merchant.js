import { FETCH_MERCHANT_JOBS, FETCH_MORE, MAKESIGNINCODE, MAKESIGNOUTCODE, RESET_LIST } from '../mutation-types'
import { post, basehost, formatTime, previewImage } from '@/utils'
const state = {
  merchantJobs: {},
  pageNum: 1,
  pageSize: 10
}

const actions = {
  [FETCH_MERCHANT_JOBS] ({state, commit}, params) {
    if (params && params.reLoad) {
      commit(RESET_LIST)
    }
    post({
      url: `${basehost}/app/job/getSellerJob`,
      loading: true,
      data: {pageNum: state.pageNum, pageSize: state.pageSize}
    }).then((res) => {
      commit(FETCH_MERCHANT_JOBS, {data: res.data})
    })
  },
  [FETCH_MORE] ({state, dispatch, commit}) {
    if (!state.merchantJobs.isLastPage) {
      state.pageNum = state.pageNum + 1
      dispatch('FETCH_MERCHANT_JOBS')
    }
  },
  [MAKESIGNINCODE] ({state, commit}, params) {
    post({
      url: `${basehost}/app/job/makeSignInCode`,
      data: params
    }).then((res) => {
      previewImage({
        current: res.data
      })
    })
  },
  [MAKESIGNOUTCODE] ({state, commit}, params) {
    post({
      url: `${basehost}/app/job/makeSignOutCode`,
      data: params
    }).then((res) => {
      previewImage({
        current: res.data
      })
    })
  }
}

const mutations = {
  [FETCH_MERCHANT_JOBS] (state, payload) {
    payload.data.list.forEach(item => { item.serverTime = formatTime(item.serverTime).split(' ')[0] })
    state.merchantJobs = !state.merchantJobs.list ? {...payload.data} : {...payload.data, list: [...state.merchantJobs.list, ...payload.data.list]}
  },
  [RESET_LIST] (state, payload) {
    state.merchantJobs.list = []
    state.pageNum = 1
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
