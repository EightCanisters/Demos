<template>
  <div class="search">
    <div class="search-box">
      <div class="search-box-left">
        <div class="search-box-left-type" @click="isShowList = true">
          {{selectProduct}}
          <ul class="search-box-left-type-list" v-show="isShowList">
            <li v-for="item in productType" @click.stop="selectType(item.text)" :key="item.text">{{item.text}}</li>
          </ul>
        </div>
        <div class="search-box-left-input">
          <input
            ref="autoFocus"
            type="text"
            v-model.trim="searchText"
            placeholder="搜索店铺或宝贝"
            class="search-box-left-input-content"
            @keyup.enter="searchSubmit"
          >
          <i class="iconfont icon-cha" v-show="isChaDisplay" @click="clearSearchText"></i>
        </div>
      </div>
      <button class="search-box-right" @click="searchSubmit">搜索</button>
    </div>
    <div class="search-content">
      <div class="search-content-null" v-if="searchHistory.length === 0">
        <img src="http://wfx.topzph.com/images/noData.png" alt="">
        <div>没有历史记录</div>
      </div>
      <div class="search-content-history">
        <div class="search-content-history-title" v-if="searchHistory.length !== 0">
          <h4>历史记录</h4>
          <i class="iconfont icon-cha" @click="clearHistory"></i>
        </div>
        <div class="search-content-history-content">
          <span
            v-for="item in searchHistory"
            :key="item.text"
            @click="handleHistorySubmit(item.text)"
          >
            <mt-badge size="normal" color="#bbb">
              {{item.text}}
            </mt-badge>
            <i class="iconfont icon-cha" @click.stop="deleteHistoryByTitle(item.text)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      selectProduct: '商品',
      productType: [{
        text: '商品'
      }, {
        text: '店铺'
      }],
      isShowList: false,
      searchText: ''
    }
  },
  computed: {
    ...mapState(['searchHistory']),
    isChaDisplay () {
      return this.searchText !== ''
    }
  },
  methods: {
    ...mapMutations([
      'changeNavbarTitle',
      'showNavbarRight',
      'changeListNavbarTitle',
      'searchByText',
      'clearAllHistory',
      'deleteHistoryByTitle'
    ]),
    selectType (text) {
      this.selectProduct = text
      this.isShowList = false
    },
    clearHistory () {
      this.$messagebox({
        title: '清空',
        message: '您确定要清空历史数据吗？',
        showCancelButton: true
      }).then((confirm) => {
        if (confirm === 'confirm') {
          this.clearAllHistory()
          this.$toast('已经清空啦~')
        }
      })
    },
    clearSearchText () {
      this.searchText = ''
      this.$refs.autoFocus.focus()
    },
    handleHistorySubmit (text) {
      this.search(text)
    },
    search (text) {
      this.searchByText(text)
      this.changeListNavbarTitle(text)
      this.$router.push({path: '/list', query: {name: text}})
    },
    searchSubmit () {
      if (this.searchText === '') {
        this.$toast('搜索数据不能为空')
        return false
      }
      this.search(this.searchText)
      this.searchText = ''
      this.$refs.autoFocus.focus()
    }
  },
  mounted () {
    this.changeNavbarTitle('商品搜索')
    this.showNavbarRight(false)
    this.$refs.autoFocus.focus()
  },
  beforeDestroy () {
    this.showNavbarRight(true)
    this.changeNavbarTitle(this.searchText)
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 100%;
  height: 100%;
  &-box{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    color: #606366;
    padding: 0 3%;
    &-left{
      width: 80%;
      height: 60%;
      border-radius: 5px;
      border: 1px solid #d9d9d9;
      display: flex;
      &-type{
        width: 22%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 3.5%;
        font-size: 14px;
        background: url(http://wfx.topzph.com/images/arrowD03.png) no-repeat 90% center;
        background-size: 30%;
        border-right: 1px solid #e4e4e4;
        position: relative;
        &-list{
          position: absolute;
          top: 90%;
          left: -5%;
          width: 80px;
          height: 80px;
          background-color: #666;
          color: #fff;
          display: flex;
          flex-direction: column;
          text-align: center;
          border-radius: 5px;
          font-size: 14px;
          &>li{
            height: 50%;
            line-height: 40px;
          }
          &>li:first-child{
            border-bottom: 1px solid grey;
          }
        }
      }
      &-input{
        width: 78%;
        height: 100%;
        &-content{
          height: 100%;
          border: none;
          padding-left: 5%;
          outline: none;
          width: 88%;
        }
      }
    }
    &-right{
      width: 15%;
      height: 55%;
      border: none;
      border-radius: 5px;
      background-color: #ed6c44;
      color: #fff;
    }
  }
  &-content{
    padding: 0 5%;
    &-null{
      width: 100%;
      text-align: center;
      &>img{
        width: 50%;
        margin: 10% 0;
      }
      &>div{
        color: #606366;
        font-size: 13px;
      }
    }
    &-history{
      width: 100%;
      margin-top: 10%;
      &-title{
        display: flex;
        justify-content: space-between;
        &>h4{font-size: 16px;}
      }
      &-content{
        margin-top: 6%;
        display: flex;
        &>span{
          position: relative;
          margin: 0 5% 5% 0;
          &>span{
            display: inline-block;
          }
          &>i{
            position: absolute;
            left: -9px;
            top: -7px;
            background-color: #ed6c44;
            border-radius: 50%;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
