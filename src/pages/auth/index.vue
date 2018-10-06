<template>
  <div class="auth">
    <div class="avatar">
      <open-data  type="userAvatarUrl"></open-data>
    </div>
    <div class="username">
      <open-data  type="userNickName"></open-data>
    </div>
    <!-- 需要使用 button 来授权登录 -->
    <button class="getUserInfo" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
    <div class="tips">请升级微信版本</div>
    <div class="merchant" @click="handleMerchantLogin">
        <div>商家入口</div>
        <span class="iconfont icon-you"></span>
    </div>
    <div :class="['merchantLogin', {metchantAnimation: isShowMerchant}]">
        <form @submit="onSubmit" >
          <div class="account"><span>账号:</span><input name="phone" type="text" placeholder="请输入您的姓名"></div>  
          <div class="password"><span>密码:</span><input name="password" type="text" placeholder="请输入您的密码"></div>
          <div class="btn-area">
            <button type="primary" class="cancel" @click="handleMerchantLogin">取消</button>
            <button type="primary" form-type="submit" class="login">确定</button>
          </div>
        </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_USER, MERCHANT_LOGIN } from '@/stores/mutation-types'
import { login } from '@/utils'
export default {
  data () {
    return {
      isShowMerchant: false
    }
  },
  computed: {
    ...mapState('auth', {
      loginStatus: state => state.loginStatus
    })
  },
  methods: {
    ...mapActions('auth', {
      getUser: FETCH_USER,
      merchantLogin: MERCHANT_LOGIN
    }),
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
          this.getUser(params)
        }
      }).catch(err => console.log(err))
    },
    handleMerchantLogin: function () {
      this.isShowMerchant = !this.isShowMerchant
    },
    onSubmit: function (e) {
      const { mp: {detail: {value}} } = e
      this.merchantLogin(value)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../icons/iconfont.css';
  .auth {
    background-color: #fff;

    .avatar {
      width: 50px;
      height: 50px;
      margin: 50px auto 0 auto;
    }

    .username {
      margin: 0 auto;
      text-align: center;
    }

    .getUserInfo {
      margin: 30px auto;
      color: #f2f2f2;
      background-color: #52a6c1;
    }

    .tips {
      text-align: center;
    }
    .merchant {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
      color: #757575;
      font-size: 16px;
      div {
        display: inline-block;
      }
      span {
        font-size: 14px;
      }
    }
    .merchantLogin {
      width: 100%;
      height: 100%;
      font-size: 20px;
      padding-top: 30px;
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      transition:  all .5s;
      transform: translateX(100%);
      opacity: 0;
      .account, .password {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        input {
          height: 40px;
          margin-left: 20px;
          font-size: 16px;
          display: inline-block;
          border: 1px solid #eee;
          &:focus {
            border: 1px solid rgb(82, 166, 193);
          }
        }
      }

      .btn-area {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        padding: 0 75px;
        button {
          font-size: 16px;
        }
        .login {
          background-color: rgb(82, 166, 193);
          color: #fff;
          &:active {
            background-color: rgb(82, 162, 144);
          }
        }
        .cancel {
          background-color: #f2f2f2;
          color: #ccc;
        }
      }
    }
    .metchantAnimation {
      opacity: 1;
      transform: translateX(0)
    }
  }
</style>