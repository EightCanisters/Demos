<template>
  <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="swipe in swipers" :key="swipe.url">
        <img :src="swipe.url" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'swipehome',
  data () {
    return {
      swipers: [
        {
          id: Math.random(),
          url: 'http://www.topzph.com//ImgUpload/Main/2018_01/201801180309394.jpg'
        }, {
          id: Math.random(),
          url: 'http://www.topzph.com//ImgUpload/Main/2018_10/201810260256183.jpg'
        }, {
          id: Math.random(),
          url: 'http://www.topzph.com//ImgUpload/Main/2018_10/201810260256194.jpg'
        }, {
          id: Math.random(),
          url: 'http://www.topzph.com//ImgUpload/Main/2018_08/201808030523274.jpg'
        }, {
          id: Math.random(),
          url: 'http://www.topzph.com//ImgUpload/Main/2018_04/201804180525044.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe{
  height: 100%;
}
</style>
