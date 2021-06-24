<template>
  <div class="logout">
    <div class="logout-img">
      <img src="http://www.topzph.com/ImgUpload/AppImg/ico_img_touxiang.jpg" alt="">
    </div>
    <div class="logout-content">
      <mt-cell title="账号" :value="username"></mt-cell>
      <mt-cell title="昵称" :value="username"></mt-cell>
      <mt-cell title="性别" value="保密"></mt-cell>
    </div>
    <div class="logout-submit">
      <button @click="userLogout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'logout',
  methods: {
    ...mapMutations(['showTabbar', 'showNavbarRight', 'changeNavbarTitle', 'logout']),
    userLogout () {
      this.logout()
      this.$toast('退出登录成功')
      this.$router.push('/home')
    }
  },
  computed: {
    ...mapState(['username'])
  },
  mounted () {
    this.showNavbarRight(false)
    this.showTabbar(false)
    this.changeNavbarTitle('个人资料')
  },
  beforeDestroy () {
    this.showNavbarRight(true)
    this.showTabbar(true)
  }
}
</script>

<style lang="scss" scoped>
.logout{
  width: 100%;
  height: 100%;
  &-img{
    width: 100%;
    height: 18%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #cdd;
    &>img{
      width: 20%;
      border-radius: 50%;
    }
  }
  &-content{
    &>a{
      border-top: 1px solid #cdd !important;
      .mint-cell-wrapper{
        background-image: none !important;
      }
    }
    &>a:last-child{
      border-bottom: 1px solid #cdd !important;
    }
  }
  &-submit{
    width: 80%;
    height: 6%;
    margin: 8% auto;
    &>button{
      width: 100%;
      height: 100%;
      border: none;
      background-color: #ea4a4e;
      color: #fff;
      font-size: 14px;
      border-radius: 10px;
    }
  }
}
</style>
