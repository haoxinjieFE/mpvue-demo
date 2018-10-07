<template>
    <div class="userContainer">
      <div class="avatarContainer">
        <div class="avatar_radius"></div>
        <div class="avatar">
          <open-data  type="userAvatarUrl"></open-data>
        </div>
        <div class="featureContainer">
          <div class="releaseList" @click="releaseListShow">
            <span>发布列表</span>
            <span :class="{
            'iconfont': true,
            'icon-you': true,
            'transform180': releaseArrow === 'drop' }"></span>
          </div>
          <div :class="['jobsList', {'listAnimation': isReleaseListShow}]">
              <div class="job" v-for="item in merchantJobs.list" :key="item.id">
              <div class="topContainer">
                <span class="jobsName">{{item.serverTime + ' ' + item.time+ '-' + item.title}}</span>
                <div class="codeBtn">
                    <button :plain="true" @click="signIn(item.id)">签到</button>
                    <button :plain="true" @click="signOut(item.id)">签退</button>
                </div>
              </div>
              <div class="signInNum">
                <span>已签到: {{item.signInCount}}</span>
                <span>已签退: {{item.signOutCount}}</span>
              </div>
            </div>  
          </div>
        </div>
      </div>   
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_MERCHANT_JOBS, FETCH_MORE, MAKESIGNINCODE, MAKESIGNOUTCODE } from '@/stores/mutation-types'
export default {
  onShow () {
    this.getMerchantJobs({reLoad: true})
  },
  data () {
    return {
      releaseArrow: 'rise',
      isReleaseListShow: false
    }
  },
  computed: {
    ...mapState('merchant', {
      merchantJobs: state => state.merchantJobs
    })
  },
  methods: {
    ...mapActions('merchant', {
      getMerchantJobs: FETCH_MERCHANT_JOBS,
      getMore: FETCH_MORE,
      getSignInCode: MAKESIGNINCODE,
      getSignOutCode: MAKESIGNOUTCODE
    }),
    releaseListShow: function () {
      this.isReleaseListShow = !this.isReleaseListShow
      if (this.releaseArrow === 'rise') {
        this.releaseArrow = 'drop'
      } else if (this.releaseArrow === 'drop') {
        this.releaseArrow = 'rise'
      }
    },
    signIn: function (id) {
      this.getSignInCode({jobId: id})
    },
    signOut: function (id) {
      this.getSignOutCode({jobId: id})
    }
  },
  async onPullDownRefresh () {
    this.getMerchantJobs({reLoad: true})
    if (!this.loading) wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getMore()
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
      font-size: 16px;
      margin: 50px auto 0 auto;
      div:not(.jobsList):not(.codeBtn) {
        padding: 10px 20px;
        .ratio {
          color: rgba(82, 166, 193, .8);
          font-size: 20px;
          font-style:italic;
        }
      }
      .releaseList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          transition: all .5s;
        }
      }
      .topContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .jobsList {
        height: 0;
        transform: scale(0);
        opacity: 0;
        transition: all .5s ;
        background-color: #f2f2f2;
        .job {
            margin-bottom: 10px;
            padding: 10px 15px 15px 0;
            background-color: #fff;
            box-shadow: 0 5px 25px #eceef0;
            .jobsName {
              max-width: 200px;
              color: rgba(0, 0, 0, 0.3);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .codeBtn {
              button {
                float: left;
                padding: 0 5px;
                color:  rgba(82, 166, 193, .8);
                font-size: 15px;
                border: none;
              }
            }
            .signInNum {
              color: rgba(0, 0, 0, 0.3);
              span {
                padding-right: 20px;
              }
            }
        }
      }
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