import { FETCH_JOBS, APPLY_JOBS, FILTER_TIME, FILTER_PERSON, FILTER_PRICE, FETCH_MORE, FETCH_SLIDERS } from '../mutation-types'
import { get, post, basehost, formatTime } from '@/utils'
const state = {
  jobs: {},
  sliders: [],
  pageNum: 1,
  pageSize: 10
}

const actions = {
  [FETCH_JOBS] ({state, commit}, params) {
    get({
      url: `${basehost}/app/job/getAllJob`,
      loading: true,
      data: {
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
    }).then((res) => {
      commit(FETCH_JOBS, {data: res.data})
    })
  },
  [FETCH_SLIDERS] ({state, commit}) {
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
            item.enlistNum += 1
            item.recordStatus = 1
          } else {
            item.recordStatus = null
            item.enlistNum -= 1
          }
        }
      })
    }).catch(e => console.log(e))
  },
  [FETCH_MORE] ({state, dispatch, commit}) {
    if (!state.jobs.isLastPage) {
      state.pageNum = state.pageNum + 1
      dispatch('FECTH_JOBS')
    }
  }
}

const mutations = {
  [FETCH_JOBS] (state, payload) {
    payload.data.list.forEach(item => { item.createTime = formatTime(item.createTime) })
    state.jobs = !state.jobs.list ? {...payload.data} : {...payload.data, list: [...state.jobs.list, ...payload.data.list]}
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
