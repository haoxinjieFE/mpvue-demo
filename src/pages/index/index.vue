myLoading<template>
  <div class="container">
     <sliders :data="sliders"/>
     <jobs :filter="{filterTime, filterPerson, filterPrice}" :jobs="jobs" :applyJobs="applyJobs" :loading="loading"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { checkLogin } from '@/utils'
import { FETCH_JOBS, APPLY_JOBS, FILTER_TIME, FILTER_PERSON, FILTER_PRICE } from '@/stores/mutation-types'
import sliders from '@/components/sliders'
import navbar from '@/components/navbar'
import jobs from '@/components/jobs'

export default {
  onShow () {
    this.getJobs(true)
  },
  mounted () {
    checkLogin()
  },

  data () {
    return {
      sliders: [
        {
          id: 1,
          url: 'wwww.google.com',
          img: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0E/00/ChMkJlnJ4TOIAyeVAJqtjV-XTiAAAgzDAE7v40Amq2l708.jpg'
        },
        {
          id: 2,
          url: 'wwww.google.com',
          img: 'http://pic.qiantucdn.com/58pic/17/86/50/76c58PICbVx_1024.jpg!qt324'
        },
        {
          id: 3,
          url: 'wwww.google.com',
          img: 'http://img95.699pic.com/photo/50055/5642.jpg_wh300.jpg'
        }
      ]
    }
  },
  computed: {
    ...mapState('jobs', {
      jobs: state => state.jobs
    })
  },
  methods: {
    ...mapActions('jobs', {
      getJobs: FETCH_JOBS,
      applyJobs: APPLY_JOBS
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
    this.getJobs(true)
    if (!this.loading) wx.stopPullDownRefresh()
  },
  onReachBottom () {
    console.log('loadmore')
    this.getJobs()
  }
}
</script>
<style lang="scss" scoped>
  .container {
    color: #757575;
  }
</style>
