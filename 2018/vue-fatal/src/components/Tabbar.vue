<template>
  <div class="tabbar">
    <router-link
      v-for="route in tabbarRoutes"
      :key="route.path"
      :to="route.path === '/category' ? route.path + '/2' : route.path"
      tag="div"
      class="tabbar-item"
    >
      <span v-if="isBadgeShow(route)">{{cartTotalCount | isMoreThan}}</span>
      <i
        :class="`${currPath.includes(route.path) ? 'icon-active' : ''} iconfont icon-${route.name}-${currPath.includes(route.path) ? 'active' : 'normal'}`"
      >
      </i>
      <span class="tabbar-item-title" v-if="!(currPath.includes(route.path))">{{route.text}}</span>
    </router-link>
  </div>
</template>

<script>
import routes from '@/router/routes'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'tabbar',
  data () {
    return {
      tabbarRoutes: routes.filter(item => item.isTabbar === true)
    }
  },
  methods: {
    isBadgeShow (route) {
      return route.path === '/cart' && this.cartData.length !== 0
    }
  },
  computed: {
    ...mapGetters(['cartTotalCount']),
    ...mapState(['cartData']),
    currPath () {
      return this.$route.fullPath
    }
  },
  filters: {
    isMoreThan (data) {
      return data > 99 ? '99+' : data
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabbar{
    height: 100%;
    display: flex;
    &-item{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #555;position: relative;
      &>span:first-child{
        position: absolute;
        right: 13px;
        top: -2px;
        font-size: 12px;
        text-align: center;
        line-height: 22px;
        width: 22px;
        height: 22px;
        background-color: red;
        border-radius: 50%;
        color: #fff;
      }
      &>i{
        font-size: 23px;
        &.icon-active{
          font-size: 30px;
          color: #9e2225;
        }
      }
      &-title{
        font-size: 14px;
      }
    }
    .router-link-exact-active, .router-link-active{
      color: #9e2225;
    }
  }
</style>
