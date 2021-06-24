<template>
  <div class="detail">
    <div v-if="isPop" class="detail-pop" >
      <pop-detail :detailData="detailData" :isPopDisplay="isPopDisplay" :class="['animated', isPop ? 'slideInUp' : '']"></pop-detail>
    </div>
    <div class="detail-content">
      <div class="swipe detail-content-swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="swipe in swipers" :key="swipe.id">
            <img :src="swipe.url" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="detail-content-desc">
        <div class="detail-content-desc-title">
          <h2>
            {{detailData.title}}
          </h2>
          <div class="detail-content-desc-title-star">
            <i class="iconfont icon-star"></i>
            <span>收藏</span>
          </div>
        </div>
        <div class="detail-content-desc-price">
          <span>{{detailData.desc}}</span>
          <label>
            <img src="http://wfx.topzph.com/images/vip/VIP.png" alt="">
            <span>{{detailData.MemberPrice}}</span>
          </label>
          <p>开通会员</p>
        </div>
        <div class="detail-content-desc-tip">
          <span>
            售出：{{Math.floor(Math.random() * (5000 - 100)) + 100}}件
          </span>
          <span>快递：包邮</span>
        </div>
      </div>
    </div>
    <div class="detail-tabbar">
      <div class="detail-tabbar-icon">
        <i class="iconfont icon-kefu"></i>
        <i class="iconfont icon-detailcart" @click="toPageCart">
          <span v-if="cartData.length !== 0">{{cartTotalCount | isMoreThan}}</span>
        </i>
      </div>
      <div class="detail-tabbar-rodo">
        <div class="detail-tabbar-rodo-addcart" @click="isPopDisplay">加入购物车</div>
        <div class="detail-tabbar-rodo-buy">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

import FtHeader from '@/components/FtHeader'
import PopDetail from '@/components/PopDetail'
export default {
  name: 'detail',
  components: {
    FtHeader,
    PopDetail
  },
  data () {
    return {
      isBackShow: true,
      isChildPage: true,
      isPop: false
    }
  },
  computed: {
    ...mapState(['detailData', 'cartData']),
    ...mapGetters(['cartTotalCount']),
    // 自己瞎搞的数据结构：
    swipers () {
      const img = []
      for (let i = 0; i < 3; i++) {
        img.push({
          id: i,
          url: this.detailData.url
        })
      }
      return img
    }
  },
  methods: {
    ...mapMutations(['changeNavbarTitle', 'showTabbar']),
    toPageCart () {
      this.$router.push('/cart')
    },
    isPopDisplay () {
      this.isPop = !this.isPop
    }
  },
  filters: {
    isMoreThan (data) {
      return data > 99 ? '99+' : data
    }
  },
  mounted () {
    this.changeNavbarTitle('商品详情页')
    this.showTabbar(false)
  },
  beforeDestroy () {
    this.showTabbar(true)
  }
}
</script>

<style lang="scss" scoped>
.detail{
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  .header-cright{
    >i{
      font-size: 22px;
      color:#999;
    }
  }
  .animated {
    animation-duration: 0.3s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  .slideInUp {
    animation-name: slideInUp;
  }
  &-pop{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
  }
  &-content{
    width: 100%;
    &-swipe{
      height: 390px;
      img{width: 100%;}
    }
    &-desc{
      width: 94%;
      height: 130px;
      margin: 5% 3%;
      border-radius: 5px;
      box-shadow: 0 3px 5px rgba(0,0,0,.1);
      background-color: #fff;
      padding: 3% 2%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-title{
        height: 40%;
        display: flex;
        font-size: 14px;
        color: #555;
        &-star{
          width: 18%;
          border-left: 1px solid #e4e4e4;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          >i{
            font-size: 18px;
          }
        }
      }
      &-price{
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        &>span{
          color: #a61f22;
        }
        &>label{
          width: 26%;
          display: flex;
          align-items: center;
          &>img{
            height: 14px;
          }
        }
        &>p{
          width: 22%;
          border: 1px solid red;
          border-radius: 5px;
          color: red;
          text-align: center;
          font-size: 13px;
        }
      }
      &-tip{
        font-size: 13px;
        color: #999;
        &>span:first-child{
          margin-right: 5%;
        }
      }
    }
  }
  &-tabbar{
    height: 52px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background-color: #fff;
    &-icon{
      width: 30%;
      display: flex;
      padding: 3% 0;
      &>i{
        display: block;
        width: 50%;
        text-align: center;
        font-size: 28px;
      }
      &>i:last-child{
        border-left: 1px solid #ccc;
        position: relative;
        &>span{
          position: absolute;
          right: 3px;
          top: -3px;
          font-size: 12px;
          text-align: center;
          line-height: 22px;
          width: 22px;
          height: 22px;
          background-color: red;
          border-radius: 50%;
          color: #fff;
        }
      }
    }
    &-rodo{
      width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &>div{
        width: 45%;
        height: 80%;
        color: #fff;
        border-radius: 6px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-addcart{
        background-color: #f17f00;
      }
      &-buy{
        background-color: #af2828;
      }
    }
  }
}
</style>
