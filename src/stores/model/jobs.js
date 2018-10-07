import { FETCH_JOBS, APPLY_JOBS, FILTER_TIME, FILTER_PERSON, FILTER_PRICE, FETCH_MORE, FETCH_SLIDERS, RESET_LIST, FIX_PHONE } from '../mutation-types'
import { get, post, basehost, formatTime } from '@/utils'
const state = {
  jobs: {},
  sliders: [],
  pageNum: 1,
  pageSize: 10,
  query: {
  }
}

const actions = {
  [FETCH_JOBS] ({state, commit}, params) {
    if (params && params.reLoad) {
      commit(RESET_LIST)
    }
    get({
      url: `${basehost}/app/job/getAllJob`,
      loading: true,
      data: {
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        ...state.query
      }
    }).then((res) => {
      commit(FETCH_JOBS, {data: res.data})
    })
  },
  [FETCH_SLIDERS] ({state, commit}, params) {
    get({
      url: `${basehost}/app/rotation/getAllRotaion`
    }).then(res => commit(FETCH_SLIDERS, res.data))
  },
  [APPLY_JOBS] ({state, commit}, params) {
    post({
      url: `${basehost}/app/jobrecord/saveRecord`,
      data: params
    }).then((res) => {
      state.jobs.list.forEach(item => {
        if (item.id === params.jobId) {
          if (item.recordStatus === null) {
            if ((item.enlistNum + 1) === item.peopleNum) {
              item.lastPeople = true
            }
            item.enlistNum += 1
            item.recordStatus = 1
          } else {
            item.recordStatus = null
            item.enlistNum -= 1
          }
        }
      })
    })
  },
  [FILTER_TIME] ({state, dispatch, commit}, params) {
    if (params === 'rise') {
      state.orderTime = 0
    } else if (params === 'drop') {
      state.orderTime = 1
    }
    commit(RESET_LIST)
    dispatch('FECTH_JOBS')
  },
  [FILTER_PERSON] ({state, dispatch, commit}, params) {
    if (params === 'rise') {
      state.orderPeople = 0
    } else if (params === 'drop') {
      state.orderPeople = 1
    }
    commit(RESET_LIST)
    dispatch('FECTH_JOBS')
  },
  [FILTER_PRICE] ({state, dispatch, commit}, params) {
    if (params === 'rise') {
      state.orderMoney = 0
    } else if (params === 'drop') {
      state.orderMoney = 1
    }
    commit(RESET_LIST)
    dispatch('FECTH_JOBS')
  },
  [FETCH_MORE] ({state, dispatch, commit}) {
    if (!state.jobs.isLastPage) {
      state.pageNum = state.pageNum + 1
      dispatch('FECTH_JOBS')
    }
  },
  [FIX_PHONE] ({state, commit}, params) {
    return new Promise((resolve, reject) => {
      post({
        url: `${basehost}/app/uuuser/consummate`,
        data: params
      }).then(data => resolve(data)).catch(e => reject(e))
    })
  }
}

const mutations = {
  [FETCH_JOBS] (state, payload) {
    payload.data.list.forEach(item => { item.serverTime = formatTime(item.serverTime).split(' ')[0] })
    state.jobs = !state.jobs.list ? {...payload.data} : {...payload.data, list: [...state.jobs.list, ...payload.data.list]}
  },
  [RESET_LIST] (state, payload) {
    state.jobs.list = []
    state.pageNum = 1
  },
  [FETCH_SLIDERS] (state, payload) {
    state.sliders = [...payload]
  },
  [FILTER_TIME] (state, payload) {
    if (payload === 'rise') {
      state.jobs.list.sort((pre, nex) => pre.createTime - nex.createTime)
    } else {
      state.jobs.list.reverse()
    }
  },
  [FILTER_PERSON] (state, payload) {
    if (payload === 'rise') {
      state.jobs.list.sort((pre, nex) => pre.enlistNum - nex.enlistNum)
    } else {
      state.jobs.list.reverse()
    }
  },
  [FILTER_PRICE] (state, payload) {
    if (payload === 'rise') {
      state.jobs.list.sort((pre, nex) => pre.money - nex.money)
    } else {
      state.jobs.list.reverse()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
