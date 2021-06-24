<template>
  <div
    class="guess page-infinite-list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="100"
  >
    <dl
      class="guess-item page-infinite-listitem"
      v-for="item in guessItems"
      :key="item.produceguid"
    >
      <div @click="sendDataToPageDetail(item)">
        <dt class="guess-item-img">
          <img :src="item.url" alt="item.url">
        </dt>
        <dd class="guess-item-content">
          <p class="guess-item-content-title">{{item.title}}</p>
          <p class="guess-item-content-price">
            <span>{{item.desc}}</span>
            <label>
              <img src="http://wfx.topzph.com/images/vip/VIP.png" alt="">
              {{item.MemberPrice}}
            </label>
          </p>
        </dd>
      </div>
    </dl>
    <p v-show="!hasMore" class="page-infinite-loading nothasmore">
      <img src="http://wfx.topzph.com/mycart/option/mescroll-nodata.png" alt="">
    </p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'guesshome',
  data () {
    return {
      guessItems: [],
      hasMore: true,
      page: 1
    }
  },
  methods: {
    ...mapMutations(['changeDetailData']),
    sendDataToPageDetail (item) {
      this.changeDetailData(item)
      this.$router.history.push({name: 'detail', query: {id: item.productguid}})
    },
    loadMore () {
      if (!this.hasMore) {
        return false
      }
      this.$ajax.getHomeGuess(this.page)
        .then(resp => {
          this.guessItems = this.guessItems.concat(resp.list)
          this.page += 1
          if (resp.list.length === 0) {
            this.hasMore = false
          }
        })
    }
  },
  mounted () {
    this.$ajax.getHomeGuess()
      .then(resp => {
        this.guessItems = resp.list
      })
  }
}
</script>

<style lang="scss" scoped>
.guess{
  width: 100%;
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  &-item{
    width: 50%;
    height: 25%;
    padding: 1.5%;
    color: #363636;
    &-img{
      width: 100%;
      height: 90%;
      &>img{
        max-height: 100%;
      }
    }
    &-content{
      &-title{
        font-size: 13px;
        margin-bottom: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-price{
        display: flex;
        font-size: 14px;
        width: 100%;
        justify-content: space-between;
        &>span{
          color: red;
        }
        img{
          width: 29px;
        }
      }
    }
  }
  .nothasmore{
    width: 100%;
    margin-top: 25px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    >img{
      height: 30px;
    }
  }
}
</style>
