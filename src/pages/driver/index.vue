<template>
    <div class="driverContainer">
      <sliders :data="sliders"/>
      <drivermodal :getDrivers="getDrivers" :id="driverId" v-if="isShowDriverModal" :showDriverModal="showDriverModal" :enroll="enroll"/>
      <driverList :getDriverId="getDriverId" :drivers="drivers" :showDriverModal="showDriverModal"/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_DRIVER, ENROLL, FETCH_MORE } from '@/stores/mutation-types'
import sliders from '@/components/sliders'
import drivermodal from '@/components/drivermodal'
import driverList from '@/components/driverList'
export default {
  onShow () {
    this.getDrivers({reLoad: true})
  },
  data () {
    return {
      driverId: '',
      isShowDriverModal: false
    }
  },
  computed: {
    ...mapState('driver', {
      drivers: state => state.drivers
    }),
    ...mapState('jobs', {
      sliders: state => state.sliders
    })
  },
  methods: {
    ...mapActions('driver', {
      getDrivers: FETCH_DRIVER,
      enroll: ENROLL,
      getMore: FETCH_MORE
    }),
    showDriverModal: function (id) {
      if (id) {
        this.driverId = id
      }
      this.isShowDriverModal = !this.isShowDriverModal
    }
  },
  components: {
    sliders,
    drivermodal,
    driverList
  },
  async onPullDownRefresh () {
    this.getDrivers({reLoad: true})
    if (!this.loading) wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getMore()
  }
}
</script>