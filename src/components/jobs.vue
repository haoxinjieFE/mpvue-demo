<template>
  <div class="jobsContainer">
    <filter :filter="filter"/>
    <div v-for="item in jobs.list" :key="item.id" class="job">
        <div class="job-base">
            <span class="name">{{item.title}}</span>
            <span class="price"><span class="iconfont icon-DrugPrice"></span>{{item.money}}/天</span>
        </div>
        <div class="job-place">
            <span><span class="iconfont icon-didian"></span>{{item.addr}}</span>
            <span><span class="iconfont icon-renshu"></span><span class="apply_num">{{item.enlistNum}}</span>/{{item.peopleNum}}</span>
        </div>
        <div class="job-extra">
            <div class="job_time"><span class="iconfont icon-shijian"></span>{{item.serverTime + ' ' + item.time}}</div>
            <button :disabled="!item.lastPeople && item.peopleNum === item.enlistNum"  type="primary" @click="handleApplyJobs(item.id)" class="apply">{{item.peopleNum === item.enlistNum ? '人数已满' : !item.recordStatus ? '申请' : '已申请'}}</button>
        </div>
        <div class="introduction">
            <span class="iconfont icon-miaoshu"></span>
            {{item.depict}}
        </div>
    </div>
  </div>
</template>
<script>
import { formatTime } from '@/utils'
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
      this.applyJobs({jobId: id})
    },
    formatDate: (date) => formatTime(date)
  },
  components: {
    filter
  }
}
</script>
<style lang="scss" scoped>
@import '../icons/iconfont.css';
  .jobsContainer {
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
          font-size: 30px;
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

        .apply_num {
          color: rgb(82, 166, 193);
        }
      }
      .job-extra {
        position: relative;
        width: 100%;
        min-height: 32px;
        .apply {
          position: absolute;
          right: 0;
          top: 0;
          width: 100px;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          background-color: rgb(82, 166, 193);
        }
      }
      .introduction {
        margin-right: 90px;
        line-height: 24px;
        width: 225px;
        word-wrap:break-word; 
        word-break:break-all;
      }
      .iconfont {
        padding-right: 10px;
      }
    }
  }
</style>
