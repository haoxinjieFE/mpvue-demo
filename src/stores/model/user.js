import { FETCH_MORE, FETCH_MY_JOBS, JOB_SIGN_STATUS, FETCH_TODAY_JOBS } from '../mutation-types'
import { get, post, basehost, formatTime, signMsg } from '@/utils'
const state = {
  myJobs: {},
  myTodayJobs: {},
  pageNum: 1,
  pageSize: 10
}

const actions = {
  [FETCH_MY_JOBS] ({state, commit}, params) {
    return new Promise((resolve, reject) => {
      get({
        url: `${basehost}/app/jobrecord/getRecord`,
        data: {pageNum: state.pageNum, pageSize: state.pageSize}
      }).then((res) => {
        commit(FETCH_MY_JOBS, {data: res.data})
        resolve()
      }).catch(e => reject(e))
    })
  },
  [FETCH_MORE] ({state, dispatch, commit}) {
    if (!state.jobs.isLastPage) {
      state.pageNum = state.pageNum + 1
      dispatch('FETCH_MY_JOBS')
    }
  },
  [FETCH_TODAY_JOBS] ({state, commit}, params) {
    return new Promise((resolve, reject) => {
      get({
        url: `${basehost}/app/jobrecord/getTodayJob`,
        data: {pageNum: state.pageNum, pageSize: state.pageSize}
      }).then((res) => {
        commit(FETCH_TODAY_JOBS, {data: res.data})
        resolve()
      }).catch(e => reject(e))
    })
  },
  [JOB_SIGN_STATUS] ({state, commit}, params) {
    console.log(params)
    post({
      url: `${basehost}/app/jobrecord/signIn`,
      data: params
    }).then(data => {
      if (data.status === 200) {
        wx.showModal({
          title: '签到成功！',
          showCancel: false,
          success: function (res) {
          }
        })
      } else {
        wx.showModal({
          title: '签到失败！',
          content: signMsg[data.status],
          showCancel: false,
          success: function (res) {
          }
        })
      }
    })
  }
}

const mutations = {
  [FETCH_MY_JOBS] (state, payload) {
    payload.data.list.forEach(item => { item.createTime = formatTime(item.createTime) })
    state.myJobs = !state.myJobs.list ? {...payload.data} : {...payload.data, list: [...state.myJobs.list, ...payload.data.list]}
  },
  [FETCH_TODAY_JOBS] (state, payload) {
    payload.data.list.forEach(item => { item.createTime = formatTime(item.createTime) })
    state.myTodayJobs = {...payload.data}
  },
  [JOB_SIGN_STATUS] (state, payload) {
    payload.data.list.forEach(item => { item.createTime = formatTime(item.createTime) })
    state.myJobs = !state.myJobs.list ? {...payload.data} : {...payload.data, list: [...state.myJobs.list, ...payload.data.list]}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
