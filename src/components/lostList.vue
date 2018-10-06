<template>
    <div class="column">
        <div class="lost" v-for="item in lostsList.list" :key="item.id">
            <div class="words">
                <span>简介：</span>
                {{item.depict}}
            </div>
            <imgList :images = item.images />
            <div class="creatTime">
              <span>{{item.createTime}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { previewImage } from '@/utils'
import imgList from './imgList'
export default {
  created () {
    console.log(this)
  },
  props: ['lostsList'],
  methods: {
    preImage: function ({url, imgList}) {
      console.log(this)
      previewImage({
        current: url,
        imgList: imgList
      })
    }
  },
  components: {
    imgList
  }
}
</script>
<style lang="scss" scoped>
  .column {
    margin-top: 10px;
    font-size: 16px;
    color: #757575;
    .lost {
      padding: 10px;
      background-color: #fff;
      margin: 0px auto 20px auto;
      background-color: #fff;
      box-shadow: 0 5px 25px #eceef0;
      .words{
        padding-top: 10px;
        line-height: 28px;
        span{font-size: 18px;color: #666666}
      }
      .creatTime {
        display: flex;
        margin-top: 20px;
        justify-content: flex-end;
        font-size: 14px;
        color: #757575;
      }
    }
  }
</style>
