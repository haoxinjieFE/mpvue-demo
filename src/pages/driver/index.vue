<template>
    <div class="driverContainer">
      <sliders :data="sliders"/>
      <drivermodal :getDrivers="getDrivers" :id="driverId" v-if="isShowDriverModal" :showDriverModal="showDriverModal" :enroll="enroll"/>
      <driverList :getDriverId="getDriverId" :drivers="drivers" :showDriverModal="showDriverModal"/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_DRIVER, ENROLL } from '@/stores/mutation-types'
import sliders from '@/components/sliders'
import drivermodal from '@/components/drivermodal'
import driverList from '@/components/driverList'
import scrollmsg from '@/components/scrollmsg'
export default {
  onShow () {
    this.getDrivers()
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
      enroll: ENROLL
    }),
    showDriverModal: function (id) {
      if (id) {
        this.driverId = id
      }
      this.isShowDriverModal = !this.isShowDriverModal
    }
  },
  sockets: {
    connect () {
      console.log('connect!')
    }
  },
  components: {
    sliders,
    drivermodal,
    driverList,
    scrollmsg
  }
}
</script>
<style lang="scss" scoped>

</style>