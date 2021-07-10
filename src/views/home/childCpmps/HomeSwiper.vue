<template>
    <swiper class="home-swiper">
      <swiper-item v-for="(item, index) in banners" :key='index' class="home-swiper-item">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type : Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
       imgLoad: true,
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoad() {
     //图片加载回调
      if(this.imgLoad){
        this.$emit('swiperImgLoad');
        this.imgLoad = null
      }
    }
  }
}
</script>

<style scoped>
  .home-swiper img {
    width: 100%;
  }
</style>