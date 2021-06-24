<template>
  <div class="cart">
    <div class="cart-content">
      <div class="cart-content-empty" v-if="isEmpty">
        <div class="cart-content-empty-img"><img src="http://wfx.topzph.com/mycart/option/mescroll-empty.png" alt=""></div>
        <p>亲，暂无相关商品~</p>
        <button @click="toPageHome">去逛逛&nbsp;&nbsp;&gt;</button>
      </div>
      <list-cart :cartData="cartData"></list-cart>
    </div>
    <div class="cart-footer">
      <div class="cart-footer-left">
        <i @click="changeChecked" :class="['iconfont', 'icon-select', isCartAllItemCheck ? 'icon-active' : '']"></i>
        合计
        <span>￥{{cartCheckedTotalPrice}}</span>
      </div>
      <button class="cart-footer-right">结算</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

import ListCart from '@/components/ListCart'

export default {
  name: 'cart',
  data () {
    return {
      isEmpty: [],
      isChecked: false
    }
  },
  methods: {
    ...mapMutations(['changeNavbarTitle', 'changeCartIschecked']),
    toPageHome () {
      this.$router.history.push('/home')
    },
    changeChecked () {
      this.isChecked = !this.isChecked
      this.changeCartIschecked(this.isChecked)
    }
  },
  computed: {
    ...mapState(['cartData']),
    ...mapGetters(['isCartAllItemCheck', 'cartCheckedTotalPrice'])
  },
  mounted () {
    this.changeNavbarTitle('购物车')
    this.isEmpty = this.cartData.length === 0
    this.isChecked = this.isCartAllItemCheck
  },
  components: {
    ListCart
  }
}
</script>

<style lang="scss" scoped>
.cart{
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  .icon-active{
    color: red;
  }
  &-content{
    width: 100%;
    flex: 1;
    overflow-x: hidden;
    &-empty{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      &-img{
        width: 45%;
        &>img{width: 100%;}
      }
      &>p{
        color: gray;
        margin-bottom: 5%;
      }
      &>button{
        width: 50%;
        height: 40px;
        border-radius: 8px;
        border: 1px solid #ac272b;
        color: #ac272b;
        background-color: #fff;
        outline: none;
      }
    }
  }
  &-footer{
    height: 52px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 4% 3%;
    &-left{
      width: 35%;
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      align-items: center;
      &>i{
        color: #aaa;
        font-size: 20px;
      }
      &>span{
        color: red;
        font-weight: bold;
      }
    }
    &-right{
      width: 13%;
      height: 30px;
      color: #fff;
      background-color: red;
      border: none;
      border-radius: 5px;
      outline: none;
    }
  }
}
</style>
