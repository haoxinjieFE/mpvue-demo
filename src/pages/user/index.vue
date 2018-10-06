<template>
    <div class="userContainer">
      <div class="avatarContainer">
        <div class="avatar_radius"></div>
        <div class="avatar">
          <open-data  type="userAvatarUrl"></open-data>
        </div>
        <div class="featureContainer">
          <div class="yieldRatio">
            <span>收益比例</span>
            <span class="ratio">{{userInfo.commisionRatio}}%</span>
          </div>
          <div class="myList" @click="myListShow">
            <span>申请列表</span>
            <span :class="{
            'iconfont': true,
            'icon-you': true,
            'transform180': applyArrow === 'drop' }"></span>
          </div>
          <div :class="['jobsList', {'listAnimation': isMyListShow}]">
            <div class="job" v-for="item in myJobs.list" :key="item.id">
              <span class="jobsName">{{item.createTime + '-' + item.jobName}}</span>
              <span class="jobsStatus">{{jobStatus[item.status]}}</span>
            </div>
          </div>
          <div class="todayList" @click="todayListShow">
            <span>今日工作</span>
            <span :class="{
            'iconfont': true,
            'icon-you': true,
            'transform180': todayArrow === 'drop' }"></span>
          </div>
           <div :class="['jobsList', {'listAnimation': isTodayListShow}]">
            <div class="job" v-for="item in myTodayJobs.list" :key="item.id">
              <span class="jobsName">{{item.jobName + '-' + '￥' + item.money + '/天'}}</span>
              <span @click="navRoad" class="jobsStatus">去这里</span>
            </div>
          </div>
          <div class="scanCode" @click="toScnaCode">
            <span>去扫码</span>
            <span class="iconfont icon-you"></span>
          </div>
          <div class="obtain border">
            <span>获得</span>
            <span>￥{{userInfo.income}}</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { openScanCode, wxStorage, navigateRoad } from '@/utils'
import { FETCH_MY_JOBS, FETCH_MORE, JOB_SIGN_STATUS, FETCH_TODAY_JOBS } from '@/stores/mutation-types'
import navbar from '@/components/navbar'
export default {
  onShow () {
    wxStorage({key: 'USERINFO'}, 'get').then(data => { this.userInfo = data.data })
    console.log(this)
  },
  destroyed () {
    console.log('destroyed')
  },
  data () {
    return {
      applyArrow: 'rise',
      todayArrow: 'rise',
      isTodayListShow: false,
      isMyListShow: false,
      userInfo: {},
      jobStatus: {
        1: '已申请',
        2: '已签到',
        3: '已签退',
        4: '已结束',
        5: '已违约'
      }
    }
  },
  computed: {
    ...mapState('user', {
      myJobs: state => state.myJobs,
      myTodayJobs: state => state.myTodayJobs
    })
  },
  methods: {
    ...mapActions('user', {
      getMyJobs: FETCH_MY_JOBS,
      getMore: FETCH_MORE,
      jobSign: JOB_SIGN_STATUS,
      getTodayJobs: FETCH_TODAY_JOBS
    }),
    toScnaCode: function () {
      openScanCode().then(data => {
        const params = {
          jobId: data.result.split('&')[0].split('=')[1]
        }
        this.jobSign(params)
      }).catch(err => console.log(err))
    },
    toNavigateRoad: function () {
      navigateRoad()
    },
    myListShow: function () {
      this.isMyListShow = !this.isMyListShow
      if (this.applyArrow === 'rise') {
        this.applyArrow = 'drop'
      } else if (this.applyArrow === 'drop') {
        this.applyArrow = 'rise'
      }
      this.getMyJobs()
    },
    todayListShow: function () {
      this.isTodayListShow = !this.isTodayListShow
      if (this.todayArrow === 'rise') {
        this.todayArrow = 'drop'
      } else if (this.todayArrow === 'drop') {
        this.todayArrow = 'rise'
      }
      this.getTodayJobs()
    },
    navRoad: function () {
      navigateRoad({})
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
        .job {
          .jobsStatus {
            color: rgba(82, 166, 193, .8);
          }
        }
      }
      .todayList {
         span {
            transition: all .5s;
         }
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
