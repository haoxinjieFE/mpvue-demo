<template>
  <swiper :autoplay="true" :indicator-dots="true" :interval="3000" :circular="true">
    <swiper-item v-for="item in data" :key="item.id">
      <a class="itemContainer">
        <img :src="item.url" alt=""/>
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>
    .itemContainer {
        width: 100%;
        height: 100%;
    }

    .itemContainer {
        img {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        
    }
</style>
