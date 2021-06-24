<template>
  <div class="mp">
    <div class="mp-main">
      <ft-header v-if="isShowNavbar" class="mp-main-header">
        <div>{{navbarTitle}}</div>
        <i slot="cright" class="iconfont icon-home-normal"></i>
      </ft-header>
      <div class="mp-main-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="mp-tabbar" v-if="isShowTabbar">
      <tabbar></tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
import FtHeader from '@/components/FtHeader'

import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Tabbar,
    FtHeader
  },
  computed: {
    ...mapState(['isShowNavbar', 'isShowTabbar', 'navbarTitle'])
  }
}
</script>

<style lang="scss">
  @import '@/libs/reset.scss';

  html,body,.mp {
    height: 100%;
    background-color: #fff;
  }
  body{
    padding-bottom: 52px;
  }
  .mp{
    width: 100%;
    &-main{
      height: 100%;
      display: flex;
      flex-direction: column;
      &-header{
        height: 48px;
      }
      &-content{
        height: calc(100% - 18px);
        flex: 1;
        overflow-x: hidden;
      }
    }
    &-tabbar{
      height: 52px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      border-top: 1px solid #d9d9d9;
      background-color: #fff;
      z-index: 999;
    }
  }
</style>
