<template>
    <div class="driverList">
        <div class="driver" v-for="item in drivers.list" :key="item.id">
            <div class="topContainer">
                <img class="logoImg" :src="item.logo" alt="">
                <div><span class="iconfont icon-didian"></span>{{item.addr}}</div>
            </div>
            <div class="middleContainer">
                <div><span class="iconfont icon-renshu"></span>{{item.peoperNum}}</div>
            </div>
            <div class="bottomContainer">
                <div class="introduction"><span class="iconfont icon-miaoshu"></span>{{item.depict}}</div>
                <button class="applyBtn" @click.stop="showDriverModal(item.id)">报名</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
    },
    getDriverId: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../icons/iconfont.css';
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
                    width: 180px;
                    height: 90px;
                }
            }
            .middleContainer {
                display: flex;
                justify-content:flex-end;
                align-items: center;
            }

            .bottomContainer {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 0 10px 0;
                position: relative;
                .introduction {
                    width: 200px;
                    margin-right: 90px;
                    display:block;
                    word-break: break-all;word-wrap: break-word;
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
            .iconfont {
                padding-right: 10px;
            }
        }
    }
</style>