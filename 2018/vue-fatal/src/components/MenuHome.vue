<template>
  <div class="menu">
    <dl v-for="menu in menus" :key="menu.url" class="menu-item">
      <dt>
        <img :src="menu.url" alt="">
      </dt>
      <dd>{{menu.text}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'menuhome',
  data () {
    return {
      menus: [
        {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_01/201801031104277.jpg',
          text: '全球购'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200351392.jpg',
          text: '奢侈品'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200352358.jpg',
          text: '美妆'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200351404.jpg',
          text: '母婴'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200351426.jpg',
          text: '酒'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200351406.jpg',
          text: '吃货'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200356364.jpg',
          text: '网红汇'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_03/201803200351467.jpg',
          text: '拼团'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_07/201807260303501.jpg',
          text: '企业采购'
        }, {
          url: 'http://www.topzph.com//ImgUpload/Main/2018_07/201807260303493.jpg',
          text: '福利礼品'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
  display: flex;
  flex-wrap: wrap;
  &-item{
    width: 20%;
    height: 85px;
    font-size: 13px;
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &>dt{
      width: 60%;
      height: 60%;
      margin-bottom: 2px;
      &>img{
        width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
