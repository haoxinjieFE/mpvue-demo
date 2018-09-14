<template>
    <div class="column">
        <div class="lost" v-for="item in lostsList" :key="item.id">
            <div class="words">
                简介：
                {{item.introduction}}
            </div>
            <div class="imgList">
                <img :src="url"  v-for="(url, id) in item.imgList" :key="id" @click="preImage({url: url, imgList: item.imgList})">
            </div>
        </div>
    </div>
</template>
<script>
import { previewImage } from '@/utils'
export default {
  props: ['lostsList'],
  methods: {
    preImage: function ({url, imgList}) {
      previewImage({
        current: url,
        imgList: imgList
      })
    }
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
    }
    .imgList {
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
      align-items: center;
      img {
        width: 200px;
        height: 100px;
        margin-left: 10px;
      }
    }
  }
</style>
