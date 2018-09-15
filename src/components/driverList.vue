<template>
    <div class="driverList">
        <div class="driver" v-for="item in drivers" :key="item.id">
            <div class="topContainer">
                <img class="logoImg" :src="item.url" alt="">
                <div>{{item.place}}</div>
            </div>
            <div class="bottomContainer">
                <div class="introduction">{{item.introduction}}</div>
                <button class="applyBtn" @click.stop="showDriverModal">报名</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  created () {
    console.log(this)
  },
  data () {
  },
  props: {
    drivers: {
      type: Array,
      default: []
    },
    showDriverModal: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
    .driverList {
        .driver {
            margin-bottom: 20px;
            padding: 15px 30px;
            box-shadow: 0 5px 25px #eceef0;
            font-size: 16px;
            color: #757575;
            .topContainer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .logoImg {
                    width: 100px;
                    height: 80px;
                }
            }
            .bottomContainer {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 0 10px 0;
                position: relative;
                .introduction {
                    margin-right: 90px;
                }
                .applyBtn {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    background-color: rgb(95, 192, 224);    
                }
            }
        }
    }
</style>