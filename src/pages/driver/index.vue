<template>
    <div class="driverContainer">
      <sliders :data="sliders"/>
      <drivermodal v-if="isShowDriverModal" :showDriverModal="showDriverModal"/>
      <driverList :drivers="drivers" :showDriverModal="showDriverModal"/>
      <scrollmsg/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_DRIVER } from '@/stores/mutation-types'
import sliders from '@/components/sliders'
import drivermodal from '@/components/drivermodal'
import driverList from '@/components/driverList'
import scrollmsg from '@/components/scrollmsg'
export default {
  created () {
    this.getDrivers()
    console.log(this)
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
      ],
      isShowDriverModal: false
    }
  },
  computed: {
    ...mapState('driver', {
      drivers: state => state.drivers
    })
  },
  methods: {
    ...mapActions('driver', {
      getDrivers: FETCH_DRIVER
    }),
    showDriverModal: function (e) {
      if (e.type !== 'submit') {
        this.isShowDriverModal = !this.isShowDriverModal
      }
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