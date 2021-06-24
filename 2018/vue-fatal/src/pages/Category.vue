<template>
  <div class="category">
    <ft-header :isRightNotShow="isRightNotShow" class="category-header">
      <div class="category-input">
        <input type="text" placeholder="搜索商品，正品才配哦" v-model.trim="searchText" @keyup.enter="onSearchSubmit">
        <i class="iconfont icon-search" @click="onSearchSubmit"></i>
      </div>
    </ft-header>
    <div class="category-content">
      <div class="category-content-menu">
        <router-link
          v-for="item in menu"
          :key="item.ID"
          tag="div"
          :to="`/category/${item.ID}`"
        >
          {{item.Name}}
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import FtHeader from '@/components/FtHeader'
import { mapMutations } from 'vuex'
export default {
  name: 'category',
  data () {
    return {
      isRightNotShow: true,
      menu: [],
      searchText: '',
      searchHistory: JSON.parse(window.localStorage.getItem('fatal-search-history')) || []
    }
  },
  components: {
    FtHeader
  },
  methods: {
    ...mapMutations(['showNavbar', 'showNavbarBack', 'changeListNavbarTitle', 'searchByText']),
    onSearchSubmit () {
      if (this.searchText === '') {
        this.$toast('搜索数据不能为空')
        return false
      }
      this.searchByText(this.searchText)
      this.changeListNavbarTitle(this.searchText)
      this.$router.push({path: '/list', query: {name: this.searchText}})

      this.searchText = ''
    }
  },
  mounted () {
    this.$ajax.getCategoryMenu()
      .then(resp => {
        this.menu = resp
        this.$router.push(`/category/${resp[0].ID}`)
      })
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
.category{
  &-header{
    align-items: center;
    justify-content: center;
    position: relative;
  }
  &-input{
    height: 35px;
    display: flex;
    &>input{
      width: 340px;
      height: 100%;
      padding:  0 8%;
      border: 1px solid #eee;
      border-radius: 15px;
      background-color: #fff;
      outline: none;
    }
    &>i{
      position: absolute;
      right: 10%;
      top: 25%;
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
<style lang="scss" scoped>
  html,
  body {
    height: 100%;
  }
.category{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-content{
    display: flex;
    overflow: hidden;
    height: 100%;
    &-menu{
      height: 100%;
      width: 25%;
      overflow-x: hidden;
      >div{
        width: 100%;
        text-align: center;
        height: 45px;
        font-size: 13px;
        line-height: 45px;
        color: #333;
        background-color: #f9f9f9;
      }
      .router-link-exact-active, .router-link-active{
        background-color: #fff;
        border-left: 2px solid #e8264f;
        color: #e8264f;
      }
    }
  }
}
</style>
