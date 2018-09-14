<template>
  <div class="jobsContainer">
    <filter :filter="filter"/>
    <div v-for="item in jobs" :key="item.id" class="job">
        <div class="job-base">
            <span class="name">{{item.name}}</span>
            <span class="price">￥{{item.price}}/天</span>
        </div>
        <div class="job-place">
            <span>{{item.place}}</span>
            <span><span class="apply_num">{{item.apply_num}}</span>/{{item.expected_num}}</span>
        </div>
        <div class="job-extra">
            <div class="job_time">时间: 2018-08-10</div>
            <button  type="primary" @click="handleApplyJobs(item.id)" class="apply">{{!item.isApply ? '申请' : '已申请'}}</button>
        </div>
        <div class="introduction">
            <span>简介：</span>
            {{item.introduction}}
        </div>
    </div>
  </div>
</template>
<script>
import { goTo, wxStorage } from '@/utils'
import filter from '@/components/filter'
export default {
  props: {
    jobs: {
      type: Array,
      default: []
    },
    applyJobs: {
      type: Function,
      default: function () {}
    },
    filter: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleApplyJobs: function (id) {
      wxStorage({
        key: 'user'
      }, 'get').then(res => {
        if (res.errMsg === 'getStorage:ok' && !res.data.openId) {
          wx.showToast({
            title: '你还没有登录!',
            icon: 'none',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                goTo({
                  url: '/pages/auth/main'
                })
              }, 2000)
            }
          })
        } else {
          this.applyJobs(id)
        }
      }).catch(e => {
        wx.showToast({
          title: '你还没有登录!',
          icon: 'none',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              goTo({
                url: '/pages/auth/main'
              })
            }, 2000)
          }
        })
      })
    }
  },
  components: {
    filter
  }
}
</script>
<style lang="scss" scoped>
  .jobsContainer {
    background-color: #f2f2f2;
    .job {
        margin: 0px auto 20px auto;
        padding: 10px 15px 15px;
        font-size: 16px;
        background-color: #fff;
        box-shadow: 0 5px 25px #eceef0;
        .job-base {
            display: flex;
            justify-content: space-between;
            .name {
                font-size: 25px;
                font-weight: bold;
            }
            .price {
                margin-top: 10px;
            }
        }
        .job-place {
            margin: 10px 0 15px 0;
            display: flex;
            justify-content: space-between;
        }
        .job-extra {
            position: relative;
            width: 100%;
            min-height: 32px;
            .apply {
                position: absolute;
                right: 0;
                top: 0;
                width: 80px;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                background-color: rgb(82, 166, 193);
            }
        }
        .introduction {
                margin-right: 90px;
                line-height: 24px;
            }
    }
  }
</style>
