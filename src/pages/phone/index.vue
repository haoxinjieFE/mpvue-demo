<template>
  <div class="phone">
    <!-- 需要使用 button 来授权登录 -->
    <button class="getPhoneNumber" open-type="getPhoneNumber" @getuserinfo="bindGetPhoneNumber">完善用户信息</button>
    <div class="tips">请升级微信版本</div>
  </div>
</template>
<script>
import { goTo, login, wxStorage, post, basehost } from '@/utils'
export default {
  data () {
    return {
      isShowTips: wx.canIUse('button.open-type.getPhoneNumber')
    }
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    login().then(data => {
      console.log(data)
      if (data.errMsg === 'login:ok' && e.target.errMsg === 'getUserInfo:ok') {
        const params = {
          code: data.code,
          nickName: e.target.userInfo.nickName,
          avatarUrl: e.target.userInfo.avatarUrl,
          gender: e.target.userInfo.gender + ''
        }
        console.log(data, params, e)
        post({url: `${basehost}/app/login/appWxLogin`, data: params}).then(data => {
          wxStorage({key: 'USER_TYPE', data: data.data.type}, 'set')
          goTo({
            url: 'page/index/main',
            type: 'navBack'
          })
        })
      }
    }).catch(err => console.log(err))
  }
}
</script>
<style lang="scss" scoped>
  @import '../../icons/iconfont.css';
  .phone {
    background-color: #fff;

    .getPhoneNumber {
      margin: 30px auto;
      color: #f2f2f2;
      background-color: #52a6c1;
    }
  }
</style>