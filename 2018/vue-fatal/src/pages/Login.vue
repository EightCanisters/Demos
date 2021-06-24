<template>
  <div class="login">
    <div class="login-logo">
      <div class="login-logo-wrapper">
        <div class="login-logo-wrapper-inner">
          <img src="http://wfx.topzph.com/images/logoNew.png" alt="">
        </div>
      </div>
    </div>
    <div class="login-input">
      <div class="login-input-name">
        <i class="iconfont icon-mine-normal"></i>
        <input type="text" placeholder="用户名/手机号" v-model.trim="username" @focus="isNameIconShow=true">
        <i v-if="isNameIconShow" :class="['iconfont', checkValue(username) ? 'icon-zhengque' : 'icon-cuowu']"></i>
      </div>
      <div class="login-input-pwd">
        <i class="iconfont icon-keyword"></i>
        <input type="password" placeholder="密码" v-model.trim="password" @focus="isPwdIconShow=true">
        <i v-if="isPwdIconShow" :class="['iconfont', checkValue(password) ? 'icon-zhengque' : 'icon-cuowu']"></i>
      </div>
    </div>
    <div class="login-submit">
      <button @click="login">登&nbsp;&nbsp;&nbsp;录</button>
    </div>
    <div class="login-tip">
      <a href="#">马上注册</a>
      <a href="#">忘记密码</a>
    </div>
    <div class="login-third">
      <h6>第三方登录</h6>
      <div>
        <i class="iconfont icon-weixin"></i>
        <i class="iconfont icon-qq"></i>
        <i class="iconfont icon-weibo"></i>
        <i class="iconfont icon-zhifubao"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      isBackShow: true,
      isChildPage: true,
      username: '',
      password: '',
      isNameIconShow: false,
      isPwdIconShow: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['changeNavbarTitle', 'showTabbar']),
    ...mapActions(['loginAction']),
    login () {
      if (this.username === '' || this.password === '') {
        this.$toast('用户名和密码不能为空~')
        return false
      }
      if (this.checkValue(this.username) === false || this.checkValue(this.password) === false) {
        this.$toast('用户名或密码必须6-18位哦~')
        return false
      }
      this.loginAction({username: this.username, password: this.password})
    },
    checkValue (value) {
      const length = value.length
      if (length > 6 && length < 18) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.changeNavbarTitle('登录')
    this.showTabbar(false)
  },
  beforeDestroy () {
    this.showTabbar(true)
  },
  watch: {
    isLogin (n, old) {
      if (n === true) {
        this.$toast('登录成功')
        this.$router.push('mine')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  padding: 0 12%;
  background-color: #fff;
  &-logo{
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-wrapper{
      width: 25%;
      height: 0;
      padding-top: 25%;
      position: relative;
      &-inner{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        &>img{
          width: 100%;
        }
      }
    }
  }
  &-input{
    width: 100%;
    height: 22%;
    &>div{
      height: 50%;
      border-bottom: 1px solid #9e9e9e;
      display: flex;
      align-items: center;
      &>i:first-child{
        width: 20%;
        height: 100%;
        font-size: 28px;
        color: #d11111;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &>i:last-child{font-size: 22px;}
      .icon-cuowu{color: #d11111;}
      .icon-zhengque{color: #19d100;}
      &>input{
        width: 75%;
        height: 95%;
        border: none;
        font-size: 14px;
        outline: none;
      }
      input:-webkit-autofill{
        box-shadow: 0 0 0px 1000px white inset !important;
      }
      input:-webkit-autofill{
        background-color: #fff !important;
      }
    }
  }
  &-submit{
    width: 100%;
    height: 15%;
    &>button{
      width: 100%;
      height: 50%;
      margin-top: 15%;
      background-color: #b60c0c;
      border: none;
      color: #fff;
      font-size: 20px;
      border-radius: 30px;
      outline: none;
    }
  }
  &-tip{
    margin-top: 10%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    &>a{
      color: #01b5bc;
      text-decoration: none;
    }
  }
  &-third{
    height: 20%;
    margin-top: 10%;
    border-top: 1px solid #ccc;
    position: relative;
    &>h6{
      padding: 5%;
      background-color: #fff;
      font-size: 15px;
      position: absolute;
      top: -22%;
      left: 31%;
    }
    &>div{
      margin-top: 15%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &>i{
        font-size: 40px;
        color: #bdbdbd;
      }
      &>I:first-child{color: #19d100;}
    }
  }
}
</style>
