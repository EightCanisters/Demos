<template>
  <div class="cartlist">
    <div
      class="cartlist-item"
      v-for="item in cartData"
      :key="item.img"
      @click.stop="toPageDetail(item)"
      @touchstart.capture="onItemTouchStart(item.id)"
      @touchend.capture="onItemTouchEnd"
    >
      <i
        :class="['iconfont', 'icon-select', item.isChecked ? 'icon-active' : '']"
        @click.stop="changeItemIschecked(item.id)"
      ></i>
      <div class="cartlist-item-img">
        <img :src="item.img" alt="item.title">
      </div>
      <div class="cartlist-item-right">
        <div class="cartlist-item-right-top">
          <h3>{{item.title}}</h3>
          <p>{{item.desc}}</p>
        </div>
        <div class="cartlist-item-right-bottom">
          <span>{{item.price}}</span>
          <div class="cartlist-item-right-bottom-count">
            <span class="cartlist-item-right-bottom-count-btn" @click.stop="reduceCartCount(item.id)">-</span>
            <span class="cartlist-item-right-bottom-count-txt">{{item.count}}</span>
            <span class="cartlist-item-right-bottom-count-btn" @click.stop="addCartCount(item.id)">+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'cartlist',
  props: ['cartData'],
  methods: {
    ...mapMutations(['addCartCount', 'reduceCartCount', 'changeItemIschecked', 'changeDetailData', 'deleteCartItemById']),
    toPageDetail (data) {
      this.changeDetailData({
        MemberPrice: data.memberPrice,
        desc: data.price,
        productguid: data.id,
        title: data.title,
        url: data.img
      })
      this.$router.history.push({name: 'detail', query: {id: data.id}})
    },
    onItemTouchStart (id) {
      this.timer = setTimeout(() => {
        this.$messagebox({
          title: '确认删除',
          message: '您确定要删除这件商品吗？',
          showCancelButton: true
        }).then((confirm) => {
          if (confirm === 'confirm') {
            this.deleteCartItemById(id)
            this.$toast('删除成功')
          }
        })
      }, 1500)
    },
    onItemTouchEnd () {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.cartlist{
  width: 100%;
  height: 100%;
  .icon-active{
    color: red;
  }
  &-item{
    width: 100%;
    height: 22%;
    display: flex;
    padding: 3% 2%;
    background-color: #fff;
    align-items: center;
    margin: 10px 0;
    &>i{
      width: 8%;
      color: #bbb;
      font-size: 20px;
    }
    &-img{
      width: 25%;
      margin-right: 2%;
      &>img{
        width: 100%;
        max-height: 100%;
        border-radius: 10px;
      }
    }
    &-right{
      width: 65%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-top{
        &>h3{
          margin-top: 3%;
          color: #333;
        }
        &>p{
          font-size: 12px;
          color: #777;
        }
      }
      &-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
        &>span{
          color: red;
        }
        &-count{
          width: 40%;
          height: 25px;
          display: flex;
          border: 1px solid #eee;
          &>span{
            text-align: center;
          }
          &-btn{
            width: 25%;
            cursor: pointer;
            background-color: #f2f2f2;
          }
          &-txt{
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
