<template>
  <div id="mask" class="container" @click.stop="showDriverModal">
    <div class="driverModal" id="modal" @click.stop="() => {}">
      <form @submit="onSubmit">
        <div class="usernameContainer">
          <div class="name_tit">姓名：</div>
          <div class="username"><input name="username" type="text" placeholder="请填写您的姓名"></div>
        </div>
        <div class="adressContainer">
          <div class="name_tit">地址：</div>
          <input name="address" type="text" placeholder="请填写您的位置">
        </div>
        <div class="adressContainer">
          <div class="name_tit">联系方式：</div>
          <input name="contact" type="text" placeholder="请填写您的联系方式">
        </div>
        <div class="form-btn">
          <button class="singUp btn" formType="submit" type="primary">报名</button>
          <button class="reset btn" type="primary">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showDriverModal: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onSubmit: function (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
  $height:30px;
  $size:16px;
  $width:70%;
  $color:#666666;
  .name_tit{float: left;width: 30%;}
  .adressContainer{height: $height;font-size: $size;line-height: $height;margin-bottom: 10px;}
  .btn{width: 40%; height: $height;font-size: $size; line-height: $height; margin-top: 30px; background-color: #52a6c1;}
  .container {
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .3);
    z-index: 999;
    .driverModal {
      width: 70%;
      background-color: #fff;
      border-radius: 5px;
      padding:30px 15px;
      .usernameContainer{
        width: 100%;
        margin-bottom: 10px;
        height: $height;
        line-height: $height;
        font-size: $size;
        .username{float:right; width: $width; color:$color;font-size: $size;}

      }
      .adressContainer{
        .adress{float:right; width: $width; color:$color;font-size: $size;}
      }
      .form-btn{
        .singUp{ float: left; }
        .reset{float: right;}
      }
    }
  }
</style>
