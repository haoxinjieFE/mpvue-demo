<template>
    <div class="userContainer">
      <div class="avatarContainer">
        <div class="avatar_radius"></div>
        <div class="avatar">
          <open-data  type="userAvatarUrl"></open-data>
        </div>
        <div class="featureContainer">
          <div class="yieldRatio border">
            <span>收益比例</span>
            <span class="ratio">100%</span>
          </div>
          <div class="myList border" @click="myListShow">
            <span>申请列表</span>
            <span :class="{
            'iconfont': true,
            'icon-you': true,
            'transform180': applyArrow === 'drop' }"></span>
          </div>
          <div :class="['jobsList', {'listAnimation': isMyListShow}]">
            <div class="job" v-for="item in myList" :key="item.id">
              <span class="jobsName">{{item.place + '-' + item.name}}</span>
              <span :class="['jobsStatus', {done: item.isDone, noDone: !item.isDone}]">{{item.isDone ? '已完成' : '未完成'}}</span>
            </div>
          </div>
          <div class="scanCode border" @click="toScnaCode">
            <span>去扫码</span>
            <span class="iconfont icon-you"></span>
          </div>
          <div class="obtain border">
            <span>获得</span>
            <span>￥20000000000</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { openScanCode } from '@/utils'
import navbar from '@/components/navbar'
export default {
  data () {
    return {
      applyArrow: 'rise',
      isMyListShow: false
    }
  },
  computed: {
    ...mapState({
      myList: state => state.jobs.jobs.slice(0, 10)
    })
  },
  methods: {
    toScnaCode: function () {
      openScanCode().then(data => console.log(data)).catch(err => console.log(err))
    },
    myListShow: function () {
      this.isMyListShow = !this.isMyListShow
      if (this.applyArrow === 'rise') {
        this.applyArrow = 'drop'
      } else if (this.applyArrow === 'drop') {
        this.applyArrow = 'rise'
      }
    }
  },
  components: {
    navbar
  }
}
</script>
<style lang="scss" scoped>
  @import '../../icons/iconfont.css';
  .userContainer {
    color: #757575;
    .avatarContainer {
      position: relative;
      .avatar {
        width: 100px;
        height: 100px;
        margin: 50px auto 0 auto;
      }
      .avatar_radius {
        position: absolute;
        left: 116px;
        top: -22px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 22px solid #fff;
      }
    }
    .featureContainer {
      margin: 50px auto 0 auto;
      div:not(.jobsList) {
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        align-items: center;
        border-bottom: .5px solid #f2f2f2;
        padding: 10px 20px;
        .ratio {
          color: rgba(82, 166, 193, .8);
          font-size: 20px;
          //font-style:italic;
        }
      }
      .myList {
        span {
          transition: all .5s;
        }
      }
      .jobsList {
        height: 0;
        transform: scale(0);
        opacity: 0;
        background-color: #f9f8f8;
        transition: all .5s ;
      }
      .noDone{color: #d4d5d5}
    }
  }
  .done {
    color: rgba(82, 166, 193, .8);
  }

  .noDone {
    color: red;
  }

  .transform180 {
    color: rgb(82, 166, 193);
    transform: rotate(90deg)
  }

  .listAnimation {
    height: 100% !important;
    transform: scale(1) !important;
    opacity: 1 !important;
  }
</style>
