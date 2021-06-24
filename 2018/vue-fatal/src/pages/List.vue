<template>
  <div class="list">
    <div>
      <mt-navbar class="page-part list-header" v-model="selected">
        <mt-tab-item v-for="item in listHeaderData" :key="item.id" :id="item.id">
          <div @click="upOrDown(item)">
            {{item.text}}
            <span v-html="showUpOrDown(item.isASC)"></span>
          </div>
        </mt-tab-item>
      </mt-navbar>
    </div>
    <div
      class="list-content page-infinite-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="50"
    >
      <dl
        class="list-content-item page-infinite-listitem"
        v-for="item in listItems"
        :key="item.Guid"
      >
        <div @click="sendDataToPageDetail(item)">
          <dt class="list-content-item-img">
            <img :src="item.OriginalImage" alt="item.url">
          </dt>
          <dd class="list-content-item-content">
            <p class="list-content-item-content-title">{{item.Name}}</p>
            <p class="list-content-item-content-price">
              <span>{{item.ShopPrice}}</span>
              <label>
                <img src="http://wfx.topzph.com/images/vip/VIP.png" alt="">
                {{item.MemberPrice}}
              </label>
            </p>
          </dd>
        </div>
      </dl>
      <p v-show="!hasMore || !hasData" class="page-infinite-loading nothasmore">
        <img src="http://wfx.topzph.com/mycart/option/mescroll-nodata.png" alt="">
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      listHeaderData: [
        {
          id: 1,
          text: '默认',
          isASC: false,
          sorts: 'ModifyTime'
        }, {
          id: 2,
          text: '价格',
          isASC: true,
          sorts: 'Price'
        }, {
          id: 3,
          text: '销量',
          isASC: true,
          sorts: 'SaleNumber'
        }
      ],
      selected: 1,
      hasMore: true,
      pagecount: 0,
      listItems: [],
      id: '',
      isASC: false,
      pageTitle: '列表',
      name: '',
      sorts: 'ModifyTime',
      hasData: true
    }
  },
  // pagecount = 0, id = '002001002', name = '', sorts = 'ModifyTime', isASC = 'false'
  computed: {
    ...mapState(['listNavbarTitle'])
  },
  methods: {
    ...mapMutations(['changeDetailData', 'changeNavbarTitle', 'showNavbarRight']),
    sendDataToPageDetail (item) {
      const { Guid, MemberPrice, Name, OriginalImage, ShopPrice } = item
      const data = {
        productguid: Guid,
        MemberPrice,
        desc: ShopPrice,
        title: Name,
        url: OriginalImage
      }
      this.changeDetailData(data)
      this.$router.history.push({name: 'detail', query: {id: Guid}})
    },
    upOrDown (item) {
      const { id, isASC, sorts } = item
      this.isASC = isASC
      this.sorts = sorts
      this.listHeaderData.map(data => {
        if (data.id === id) {
          data.isASC = !data.isASC
          this.isASC = data.isASC
        }
        return data
      })
      this.$ajax.getListData(this.pagecount, this.id, this.name, this.sorts, this.isASC)
        .then(resp => {
          this.listItems = resp.list
        })
    },
    showUpOrDown (data) {
      return data ? `<span>&uarr;</span>` : `<span>&darr;</span>`
    },
    loadMore () {
      // pagecount = 0, id = '002001002', name = '', sorts = 'ModifyTime', isASC = 'false'
      if (!this.hasMore || this.pagecount === 0) {
        return false
      }
      this.$ajax.getListData(this.pagecount, this.id, this.name, this.sorts, this.isASC)
        .then(resp => {
          this.listItems = this.listItems.concat(resp.list)
          this.pagecount += 1
          if (resp.list.length === 0) {
            this.hasMore = false
          }
        })
    }
  },
  mounted () {
    this.changeNavbarTitle(this.listNavbarTitle)
    this.id = this.$route.query.ProductCategoryCode || ''
    this.name = this.$route.query.name || ''
    this.showNavbarRight(false)
    this.$ajax.getListData(this.pagecount, this.id, this.name, this.sorts, this.isASC)
      .then(resp => {
        // console.log(JSON.parse(resp))
        // console.log(typeof resp)
        // if( typeof resp === 'string')
        // console.log(resp)
        //   console.log((JSON.parse(resp)))
        this.listItems = resp.list
        if (resp.list.length === 0) {
          this.hasData = false
        }
      })
  },
  beforeDestroy () {
    this.showNavbarRight(true)
  }
}
</script>

<style lang="scss" scoped>
.list{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header{
    height: 40px;
    display: flex;
    border-bottom: 1px solid #e4e4e4;
    .mint-tab-item{
      color: #999;
      &>div:last-child{
        background-color: #ed6c44;
        font-size: 15px !important;
      }
    }
    .is-selected{
      border: none;
      color: #ed6c44;
    }
  }
  &-content{
    flex: 1;
    overflow-x: hidden;
    width: 100%;
    padding: 2%;
    display: flex;
    flex-wrap: wrap;
    &-item{
      width: 50%;
      height: 230px;
      padding: 1.5%;
      color: #363636;
      &-img{
        width: 100%;
        height: 70%;
        text-align: center;
        &>img{max-height: 169px;}
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
}
</style>
