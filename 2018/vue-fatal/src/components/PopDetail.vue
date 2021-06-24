<template>
  <div class="popdetail">
    <div class="popdetail-content">
      <div class="popdetail-content-head">
        <div class="popdetail-content-head-close" @click="closePopDisplay">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAArCAMAAAA0X5qLAAAAclBMVEUAAABdY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY21dY20tW12wAAAAJXRSTlMA+AoFS+zkdiWiUUKruYIW8V3Uxj4xv6+NHZRuaTgP581rLdhsW1bF6wAAAaBJREFUOMuVlVeWwyAMRWGMG3biErf0MqP9b3EQLqIkOYf3E6zcvMhCCOaokqch4QA8GU6yYl8UNTuwtGuiT+g5AU/J+S3etYCKx1T2WdbLdIwB1Xa+7R5QpYiMmCgBtXfMf0aNZq5HpvHxx2IHFboL9kbiDgCDQUdYhMOHQlUHLAtlMuGj8WMnRbSatn9CX2J9Gr3Fsk4Akq+bVSExu2HRCvZVBRYQF7caIF+LnVvFO56mJbscoL6pzxSAH+dQA5BkBvsLkC5LPi9bNKY3jV/bhmCrNGyzblXIzDidaWInM+uMPdXXjFl0j6tXTCxKPT7Rv2Q2XV8Z62NdAFKJ2T505qSLpq81YNx2eaC9ZC7Nkf2zwhLTVdGOuTTq4pwNFUK4Z7Ym2PIl9Qj7zoIjzAvf2c+5gVlceDl71Wg0JznRVA23zpclA0E01dnZwTNWuVsz542zg9QbtH9aBcc+snrD6jq5dgbRhdF1dj+na88RvTf62T4pt9weM9f2cDROSsgZDDrdIXMjZCIFzbqQKRoyn0Mmf8CdEnxbhd+DQTfsPweDSEtbXT+MAAAAAElFTkSuQmCC" alt="">
        </div>
        <div class="popdetail-content-head-left">
          <div class="popdetail-content-head-left-img">
            <img :src="detailData.url" :alt="detailData.title">
          </div>
        </div>
        <div class="popdetail-content-head-right">
          <span>{{detailData.desc}}</span>
          <label>
            <img src="http://wfx.topzph.com/images/vip/VIP.png" alt="">
            <span>{{detailData.MemberPrice}}</span>
          </label>
          <p>库存 226</p>
        </div>
      </div>
      <div class="popdetail-content-main">
        <div class="popdetail-content-main-item">
           <h4 class="title">规格</h4>
           <button :class="{'active':normal}" @click="changeNormal">常规</button>
        </div>
        <div class="popdetail-content-main-count">
           <h4 class="title">购买数量</h4>
           <div class="count">
             <span class="btn" @click="reduceCount">-</span>
             <span class="txt">{{count}}</span>
             <span class="btn" @click="addCount">+</span>
           </div>
        </div>
      </div>
    </div>
    <button class="popdetail-footer" @click="addItemToCart">确定</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'popdetail',
  props: ['detailData', 'isPopDisplay'],
  data () {
    return {
      normal: false,
      count: 1
    }
  },
  methods: {
    ...mapMutations(['addToCart']),
    closePopDisplay () {
      this.isPopDisplay()
    },
    changeNormal () {
      this.normal = !this.normal
    },
    reduceCount () {
      if (this.count < 2) {
        return false
      }
      this.count -= 1
    },
    addCount () {
      this.count += 1
    },
    addItemToCart () {
      if (this.normal === false) {
        this.$toast({message: '请选择规格'})
        return false
      }
      const {
        productguid,
        title,
        url,
        desc,
        MemberPrice
      } = this.detailData
      const cartItemData = {
        id: productguid,
        title,
        img: url,
        price: desc,
        memberPrice: MemberPrice,
        count: this.count,
        desc: this.normal ? '常规' : '',
        isChecked: false
      }
      this.addToCart(cartItemData)
      this.$toast({message: '加入购物车成功'})
      this.closePopDisplay()
    }
  }
}
</script>

<style lang="scss" scoped>
.popdetail{
  width: 100%;
  height: 70%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  display: flex;
  flex-direction: column;
  &-content{
    flex: 1;
    overflow-x: hidden;
    &-head{
      width: 100%;
      height: 25%;
      border-bottom: 1px solid #e7e7e7;
      padding: 5% 3%;
      display: flex;
      position: relative;
      &-close{
        position: absolute;
        right: 3%;
        top: 7%;
        width: 7%;
      }
      &-left{
        width: 40%;
        &-img{
          width: 110px;
          position: fixed;
          left: 3%;
          top: -6%;
          &>img{border-radius: 10px;}
        }
      }
      &-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &>span{
          color: red;
        }
        &>label{
          display: flex;
          align-items: center;
          font-size: 14px;
          &>img{
            height: 14px;
          }
        }
        &>p{
          font-size: 14px;
        }
      }
    }
    &-main{
      width: 100%;
      padding: 0 3%;
      &>div{
        padding: 3% 0;
      }
      &-item{
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
        &>button{
          border: none;
          width: 70px;
          height: 30px;
          border-radius: 10px;
          outline: none;
        }
        .title{
          height: 40px;
        }
      }
      .title{
        font-size: 15px;
      }
      .active{
        background-color: #f60;
        color: #fff;
      }
      &-count{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        .count{
          display: flex;
          border: 1px solid #f1f1f1;
          &>span{
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
          }
          .btn{
            width: 35px;
            background-color: #f1f1f1;
          }
          .txt{
            width: 50px;
          }
        }
      }
    }
  }
  &-footer{
    height: 48px;
    background-color: #f60;
    color: #fff;
    font-size: 15px;
    border: none;
    outline: none;
  }
}
</style>
