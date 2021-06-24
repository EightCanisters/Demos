<template>
  <div class="mine">
    <router-link class="mine-header" :to="{name: 'logout'}" tag="div">
      <div class="mine-header-left">
        <img src="http://www.topzph.com/ImgUpload/AppImg/ico_img_touxiang.jpg" alt="">
      </div>
      <div class="mine-header-right">
        <div class="mine-header-right-title">{{username}}</div>
        <div class="mine-header-right-vip">
          <img src="http://wfx.topzph.com/images/vip/noVipIcon.png" alt="">
          <span>升级</span>
        </div>
        <div class="mine-header-right-money">
          <span>余额：0.00</span>
          <span>账单明细&gt;</span>
        </div>
      </div>
    </router-link>
    <div class="mine-cal">
      <div>
        <i class="iconfont icon-jisuanqi"></i>
        <span>收益计算器</span>
      </div>
      <div>
        <i class="iconfont icon-tuiguang"></i>
        <span>推广会员</span>
      </div>
    </div>
    <div class="mine-aid">
      <img src="http://wfx.topzph.com/images/vip/vipHot.png" alt="">
    </div>
    <div class="mine-order">
      <div class="mine-order-top">
        <div>商城订单</div>
        <span>全部订单&nbsp;&nbsp;&nbsp;&gt;</span>
      </div>
      <div class="mine-order-bottom">
        <div class="mine-order-bottom-item">
          <i class="iconfont icon-fukuan"></i>
          <span>待付款</span>
        </div>
        <div class="mine-order-bottom-item">
          <i class="iconfont icon-fahuo"></i>
          <span>待发货</span>
        </div>
        <div class="mine-order-bottom-item">
          <i class="iconfont icon-shouhuo"></i>
          <span>待收货</span>
        </div>
        <div class="mine-order-bottom-item">
          <i class="iconfont icon-wancheng"></i>
          <span>已完成</span>
        </div>
        <div class="mine-order-bottom-item">
          <i class="iconfont icon-tuihuo"></i>
          <span>退货</span>
        </div>
      </div>
    </div>
    <div class="mine-aid">
      <img src="http://wfx.topzph.com/images/taocan/logo.jpg" alt="">
    </div>
    <div class="mine-nav">
      <div class="mine-nav-item" v-for="item in nav" :key="item.text">
        <div class="mine-nav-item-img">
          <img :src="item.url" alt="">
        </div>
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'mine',
  data () {
    return {
      nav: [
        {
          text: '去赚钱',
          url: 'http://wfx.topzph.com/images/userInfoImg/32.png'
        }, {
          text: '合伙人中心',
          url: 'http://wfx.topzph.com/images/userInfoImg/33.png'
        }, {
          text: 'VIP权益',
          url: 'http://wfx.topzph.com/images/userInfoImg/35.png'
        }, {
          text: 'VIP赠品',
          url: 'http://wfx.topzph.com/images/userInfoImg/30.png'
        }, {
          text: '免费拿',
          url: 'http://wfx.topzph.com/images/userInfoImg/26.png'
        }, {
          text: '全民拼团',
          url: 'http://wfx.topzph.com/images/userInfoImg/29.png'
        }, {
          text: '预存款提现',
          url: 'http://wfx.topzph.com/images/userInfoImg/28.png'
        }, {
          text: '我的券包',
          url: 'http://wfx.topzph.com/images/userInfoImg/21.png'
        }, {
          text: '我的收藏',
          url: 'http://wfx.topzph.com/images/userInfoImg/25.png'
        }, {
          text: '地理管理',
          url: 'http://wfx.topzph.com/images/userInfoImg/23.png'
        }, {
          text: '人工客服',
          url: 'http://wfx.topzph.com/images/userInfoImg/20.png'
        }, {
          text: '账户安全',
          url: 'http://wfx.topzph.com/images/userInfoImg/22.png'
        }, {
          text: '信用卡',
          url: 'http://wfx.topzph.com/images/userInfoImg/38.png'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['showNavbar'])
  },
  computed: {
    ...mapState(['username'])
  },
  mounted () {
    this.showNavbar(false)
  },
  beforeDestroy () {
    this.showNavbar(true)
  }
}
</script>

<style lang="scss" scoped>
.mine{
  width: 100%;
  height: 100%;
  color: #555;
  background-color: #ddd;
  font-size: 14px;
  &-header{
    width: 100%;
    height: 22%;
    background: url(http://wfx.topzph.com/images/vip/vipCenterBg.png) no-repeat;
    padding: 4% 5%;
    display: flex;
    &-left{
      width: 42%;
      margin-right: 5%;
      overflow: hidden;
      &>img{
        width: 100%;
        border-radius: 50%;
      }
    }
    &-right{
      font-size: 16px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      &-vip{
        &>img{width: 18%;}
        &>span{
          display: inline-block;
          width: 20%;
          text-align: center;
          border-radius: 10px;
          background-color: #bc5153;
        }
      }
      &-money{
        font-size: 14px;
        &>span:first-child{margin-right: 2%;}
      }
    }
  }
  &-cal{
    width: 100%;
    height: 10%;
    display: flex;
    background-color: #fff;
    &>div{
      width: 50%;
      padding: 2% 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      font-size: 15px;
      color: #555;
      &>i{
        font-size: 22px;
        color: #555;
      }
      &:first-child{
        border-right: 2px solid #ddd;
      }
    }
  }
  &-order{
    height: 22%;
    background-color: #fff;
    &>div{
      border-top: 1px solid #ddd;
    }
    &-top{
      padding: 0 2%;
      height: 40%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      &>div{font-size: 16px;}
    }
    &-bottom{
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 60%;
      &>div{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 2% 0;
        font-size: 15px;
        &>i{
          font-size: 22px;
          color: #9f9f9f;
        }
      }
    }
  }
  &-nav{
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    &-item{
      width: 25%;
      height: 80px;
      border-bottom: 1px solid #ddd;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 2% 0;
      &-img{
        width: 35px;
        &>img{
          width: 100%;
        }
      }
    }
  }
  &-aid{
    height: 10%;
    &>img{height: 100%;}
  }
}
</style>
