<template>
  <div class="categorylist">
    <div
      v-for="list in lists"
      :key="list.Code"
      class="categorylist-container"
    >
      <h3 class="categorylist-container-title">{{list.Name}}</h3>
      <div class="categorylist-container-list">
        <div v-for="item in list.children" :key="item.Code" class="categorylist-container-list-item" @click="changeDetailTitle(item.Name)">
          <router-link :to="`/list?ProductCategoryCode=${item.Code}`" tag="dl">
            <dt>
              <img :src="`http://www.topzph.com/${item.ImageUrlFirst}`" :alt="item.Name" >
            </dt>
            <dd>
              {{item.Name}}
            </dd>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'categorylist',
  data () {
    return {
      lists: [],
      currId: 2
    }
  },
  computed: {
    ...mapState(['categoryList'])
  },
  methods: {
    ...mapMutations(['changeNavbarTitle', 'changeListNavbarTitle', 'saveCategoryList']),
    changeDetailTitle (title) {
      this.changeListNavbarTitle(title)
      this.changeNavbarTitle(title)
    },
    getCategoryList (id) {
      const isGeted = this.categoryList.some(item => item.id === id)
      if (isGeted) {
        this.categoryList.map(item => {
          if (item.id === id) {
            this.currId = item.id
            this.lists = item.list
          }
          return item
        })
        return false
      }
      this.$ajax.getCategoryList(id)
        .then(resp => {
          this.lists = resp
          this.currId = id
          const data = {
            id,
            list: resp
          }
          this.saveCategoryList(data)
        })
    },
    saveCategoryData () {

    }
  },
  mounted () {
    this.getCategoryList(this.$route.params.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.getCategoryList(to.params.id)
    next()
  }
}
</script>

<style lang="scss" scoped>
.categorylist{
  height: 100%;
  flex: 1;
  overflow-x: hidden;
  padding: 0 3%;
  background: #fff;
  &-container{
    width: 100%;
    &-title{
      height: 55px;
      line-height: 55px;
    }
    &-list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      &-item{
        width: 33.3%;
        margin-bottom: 3%;
        dl{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          dt{
            width: 70%;
            img{width: 100%;}
          }
          dd{
            font-size: 13px;
            color: #666;
          }
        }
      }
    }

  }
}
</style>
