<template>
        <div class="imgList">
            <img  v-for="url in images" :key="url" :src="url"  @click="preImage({url: url, imgList: images})"/>
        </div>
</template>
<script>
import { previewImage } from '@/utils'
export default {
  data () {
  },
  props: ['images'],
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
</style>