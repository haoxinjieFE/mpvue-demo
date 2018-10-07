<template>
  <div class="container">
     <sliders :data="sliders"/>
     <jobs :filter="{filterTime, filterPerson, filterPrice}" :jobs="jobs" :applyJobs="applyJobs" :loading="loading"/>
     <div v-if="isShowPhoneModal" class="fixPhone">
        <form @submit="onSubmit" >
          <div class="phoneContainer">
            <div class="title">请完善手机号</div>
            <div class="phoneInput"><input name="phone" type="text" placeholder="请填写您的联系方式"></div>
            <span class="rules">{{errormsg}}</span>
            <div class="phoneBtn">
              <button class="confirm btn" formType="submit" type="primary">确定</button>
            <button class="cancel btn" @click="hidePhoneModal" type="primary">取消</button>
            </div> 
          </div>
        </form>
     </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { checkLogin, wxStorage } from '@/utils'
import { FETCH_JOBS, APPLY_JOBS, FILTER_TIME, FILTER_PERSON, FILTER_PRICE, FETCH_MORE, FETCH_SLIDERS, FIX_PHONE } from '@/stores/mutation-types'
import sliders from '@/components/sliders'
import jobs from '@/components/jobs'

export default {
  onShow () {
    this.getJobs({reLoad: true})
    this.getSliders()
  },
  mounted () {
    checkLogin()
    wxStorage({key: 'USER_STATUS'}, 'get').then(data => {
      if (data.data === 205) {
        wx.showModal({
          title: '提示',
          content: '您的信息不完整, 请完善信息',
          success: res => {
            if (res.confirm) {
              this.showPhoneModal()
            }
          }
        })
      }
    }
    )
  },
  data () {
    return {
      errormsg: '',
      isShowPhoneModal: false
    }
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
      getSliders: FETCH_SLIDERS,
      filterTime: FILTER_TIME,
      filterPerson: FILTER_PERSON,
      filterPrice: FILTER_PRICE,
      fixPhone: FIX_PHONE
    }),
    onSubmit: function (e) {
      if (!e.target.value.phone) {
        this.errormsg = '不能为空'
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(e.target.value.phone)) {
        this.errormsg = '请输入正确的手机号'
      } else {
        this.errormsg = ''
        this.fixPhone(e.target.value).then(data => {
          this.showPhoneModal()
          if (data.status === 200) {
            wxStorage({key: 'USER_STATUS', data: data.status}, 'set').then(data => {
              if (data.errmsg === 'setStorage:ok') {
                wx.showToast({
                  title: '信息完善成功！'
                })
              }
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '信息完善成功！'
            })
          }
        })
      }
    },
    showPhoneModal: function () {
      this.isShowPhoneModal = !this.isShowPhoneModal
    },
    hidePhoneModal: function () {
      this.isShowPhoneModal = false
    }
  },
  components: {
    sliders,
    jobs
  },
  async onPullDownRefresh () {
    this.getJobs({reLoad: true})
    if (!this.loading) wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getMore()
  }
}
</script>
<style lang="scss" scoped>
  .container {
    color: #757575;
    .fixPhone {
      position: fixed;
      display: flex;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, .3);
      z-index: 999;
      .phoneContainer {
        text-align: center;
        padding: 10px 20px;
        background-color:rgba(255, 255, 255, .9);
        width: 100%;
        margin-bottom: 10px;
        line-height: 30px;
        font-size: 16px;
        .title {
          width: 100%;
          text-align: center;
        }
        .phoneInput {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          input {
            text-align: left;
            border: 1px solid rgba(0, 0, 0, .3);
          }
        }
        .phoneBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          .confirm {
            margin-right: 20px;
          }
        }
        .btn {
          width: 40%; 
          height: 30px;
          font-size: 16px; 
          line-height: 30px;
          margin-top: 30px; 
          background-color: #52a6c1;
        }
      }
    }

    .rules {
        color: rgb(	255, 69, 0)
      }
  }
</style>
