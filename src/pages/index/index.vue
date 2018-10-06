<template>
  <div class="container">
     <sliders :data="sliders"/>
     <jobs :filter="{filterTime, filterPerson, filterPrice}" :jobs="jobs" :applyJobs="applyJobs" :loading="loading"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { checkLogin } from '@/utils'
import { FETCH_JOBS, APPLY_JOBS, FILTER_TIME, FILTER_PERSON, FILTER_PRICE, FETCH_MORE, FETCH_SLIDERS } from '@/stores/mutation-types'
import sliders from '@/components/sliders'
import navbar from '@/components/navbar'
import jobs from '@/components/jobs'

export default {
  onShow () {
    this.getJobs()
    this.getSliders()
  },
  mounted () {
    checkLogin()
  },
  computed: {
    ...mapState('jobs', {
      jobs: state => state.jobs,
      sliders: state => state.sliders
    })
  },
  methods: {
    ...mapActions('jobs', {
      getJobs: FETCH_JOBS,
      applyJobs: APPLY_JOBS,
      getMore: FETCH_MORE,
      getSliders: FETCH_SLIDERS
    }),
    ...mapMutations('jobs', {
      filterTime: FILTER_TIME,
      filterPerson: FILTER_PERSON,
      filterPrice: FILTER_PRICE
    })
  },
  components: {
    sliders,
    navbar,
    jobs
  },
  async onPullDownRefresh () {
    console.log('pullDowns')
    this.getJobs()
    if (!this.loading) wx.stopPullDownRefresh()
  },
  onReachBottom () {
    console.log('loadmore')
    this.getMore()
  }
}
</script>
<style lang="scss" scoped>
  .container {
    color: #757575;
  }
</style>
