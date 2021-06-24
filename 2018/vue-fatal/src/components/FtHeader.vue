<template>
  <div class="header">
    <div class="header-back" @click="onBack" v-if="isBackShow">
      <i class="iconfont icon-left"></i>
    </div>
    <div class="header-cleft">
      <slot></slot>
    </div>
    <div class="header-cright" @click="toPageHome">
      <slot name="cright" v-if="isRightShow"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ftheader',
  methods: {
    onBack () {
      this.$router.history.go(-1)
    },
    toPageHome () {
      this.$router.history.push('/home')
    }
  },
  computed: {
    ...mapState(['isBackShow', 'isRightShow'])
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 4%;
  color: #333;
  background-color: #fff;
  z-index: 999;
  &-back{
    &>i{
      font-size: 15px;
      color: #333;
    }
  }
  &-cleft{
    font-size: 17px;
  }
  &-cright{
    i{
      font-size: 22px;
      color: #999
    }
  }
}
</style>
