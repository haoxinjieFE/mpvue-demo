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
            <div class="job" v-for="item in myList" :key="item.id">
              <span class="jobsName">{{'2018-08-10'+ '-' + item.name}}</span>
              <div class="codeBtn">
                  <button :plain="true" @click="signIn">签到</button>
                  <button :plain="true" @click="signIn">签退</button>
              </div>
            </div>  
          </div>
        </div>
      </div>   
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { openScanCode, previewImage } from '@/utils'
export default {
  data () {
    return {
      releaseArrow: 'rise',
      isReleaseListShow: false
    }
  },
  computed: {
    ...mapState('jobs', {
      myList: state => state.jobs.slice(0, 10)
    })
  },
  methods: {
    toScnaCode: function () {
      openScanCode().then(data => console.log(data)).catch(err => console.log(err))
    },
    releaseListShow: function () {
      this.isReleaseListShow = !this.isReleaseListShow
      if (this.releaseArrow === 'rise') {
        this.releaseArrow = 'drop'
      } else if (this.releaseArrow === 'drop') {
        this.releaseArrow = 'rise'
      }
    },
    signIn: function () {
      previewImage({
        current: 'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_efde696.png'
      })
    }
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
      div:not(.jobsList):not(.codeBtn) {
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        align-items: center;
        border-bottom: .5px solid #f2f2f2;
        padding: 10px 20px;
        .ratio {
          color: rgba(82, 166, 193, .8);
          font-size: 20px;
          font-style:italic;
        }
      }
      .releaseList {
        span {
          transition: all .5s;
        }
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
            font-size: 16px;
            background-color: #fff;
            box-shadow: 0 5px 25px #eceef0;
            .jobsName {
              color: rgba(0, 0, 0, 0.3)
            }
            .codeBtn {
              display: flex;
              button {
                padding: 0 5px;
                color:  rgba(82, 166, 193, .8);
                font-size: 15px;
                border: none;
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