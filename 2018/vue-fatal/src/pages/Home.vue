<template>
  <div class="home">
     <ft-header :isBackShow="isBackShow">
      <div class="home-cleft" @click.stop="toPageCategory">
        <i class="iconfont icon-searchlist"></i>
        <span>分类</span>
      </div>
      <div slot="cright" class="home-cright" @click.stop="toPageSearch">
        <label>
          <input type="text" placeholder="搜索商品，正品才配哦">
          <i class="iconfont icon-search"></i>
        </label>
      </div>
    </ft-header>
    <div class="home-content">
      <div class="home-swipe">
        <swipe-home></swipe-home>
      </div>
      <div class="home-menu">
        <menu-home></menu-home>
      </div>
      <div class="home-guessyoulike">
        <h1>猜你喜欢</h1>
        <guess-home></guess-home>
      </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FtHeader from '@/components/FtHeader'
import SwipeHome from '@/components/SwipeHome'
import MenuHome from '@/components/MenuHome'
import GuessHome from '@/components/GuessHome'
export default {
  name: 'home',
  data () {
    return {
      isBackShow: false
    }
  },
  methods: {
    ...mapMutations(['showNavbar', 'showNavbarBack']),
    toPageCategory () {
      this.$router.push('/category')
    },
    toPageSearch () {
      this.$router.push('/search')
    }
  },
  components: {
    FtHeader,
    SwipeHome,
    MenuHome,
    GuessHome
  },
  mounted () {
    this.showNavbar(false)
    this.showNavbarBack(false)
  },
  beforeDestroy () {
    this.showNavbar(true)
    this.showNavbarBack(true)
  }
}
</script>

<style lang="scss">
  .home{
    width: 100%;
    &-cleft{
      width: 50px;
      display: flex;
      flex-direction: column;
      color: #333;
      &>i{
        font-size: 25px;
        color: #888;
      }
      &>span{
        font-size: 13px;
      }
    }
    &-cright{
      width: 310px;
      height:35px;
      position: relative;
      &>label{
        &>input{
          width: 80%;
          height: 100%;
          padding-left: 8%;
          border: 1px solid #eee;
          border-radius: 15px;
          background-color: #f0f0f0;
          outline: none;
        }
        &>i{
          position: absolute;
          right: 24%;
          top: 20%;
          color: #999;
          font-size: 18px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
.home{
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  &-content{
    flex: 1;
    overflow-x: hidden;
  }
  &-swipe{
    height: 175px;
  }
  &-menu{
    width: 100%;
    padding: 1.5%;
  }
  &-guessyoulike>h1{
    width: 100%;
    height: 25px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #555;
  }
}
</style>
