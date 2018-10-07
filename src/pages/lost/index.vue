<template>
    <div class="lostContainer">
        <div class="rules">
          言论
        </div>
        <lostList :lostsList="losts" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_LOST, FETCH_MORE } from '@/stores/mutation-types'
import lostList from '@/components/lostList'
export default {
  onShow () {
    this.getLosts({reLoad: true})
  },
  computed: {
    ...mapState('losts', {
      losts: state => state.losts
    })
  },
  methods: {
    ...mapActions('losts', {
      getLosts: FETCH_LOST,
      getMore: FETCH_MORE
    })
  },
  components: {
    lostList
  },
  async onPullDownRefresh () {
    this.getLosts({reLoad: true})
    if (!this.loading) wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getMore()
  }
}
</script>
<style lang="scss" scoped>
     .rules {
            height: 100px;
            text-align: center;
            line-height: 100px;
        }
</style>