<template>
  <div id="detail-main">
    <!-- 子组件navbar -->
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="detailnav"></detail-nav-bar>

    <!-- 滚动组件scroll管理 -->
    <scroll 
      class="detail-content" 
      ref="scroll"
      :pull-Up-Load='true'
      :probe-type="3"
      @scroll="detailScroll"
      @pullingUp='detailPullingUp'>

      <!-- 轮播图 -->
      <detail-swiper :top-Images = 'topImages'></detail-swiper>
      <!-- 基础信息 -->
      <detail-base-info :goods = 'goods' :columns = 'columns'></detail-base-info>
      <!-- 店铺展示 -->
      <detail-shop-info :shop = 'shop'></detail-shop-info>
      <!-- 详情展示 -->
      <detail-goods-info :detail-Info="detailInfo" @imageLoad='imageLoad'></detail-goods-info>
      <!-- 参数展示 -->
      <detail-param-info :param-Info="paramInfo" ref="params"></detail-param-info>
      <!-- 评价展示 -->
      <detail-comment-info :comment-Info="commentInfo" ref="comment"></detail-comment-info>
      <!-- 详情推荐位 -->
      <goods-list :goods='recommends' ref="recommend"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    
  </div>
</template>

<script>
import DetailNavBar  from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import BackTop from "components/content/backTop/BackTop";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {  
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    BackTop,
  },

  mixins: [itemListenerMixin],

  unmounted() {
    this.emitter.off("imgLoad", this.itemImageListener)
  },

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      columns:[],
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      currentIndex:0,
      isShowBackTop: false
    }
  },
  created() {
    //A、保存iid
    this.iid = this.$route.params.iid
    //B、请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //1、轮播图数据
      this.topImages = data.itemInfo.topImages;
      //2、商品详情介绍数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.columns = this.goods.columns; 
      //3、店铺信息
      this.shop = new Shop(data.shopInfo) 
      //4、商品详细信息
      this.detailInfo = data.detailInfo
      //5、参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6、评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //C、请求推荐数据
    getRecommend().then(res =>{
      this.recommends = res.data.list
    });
  },

  methods: {
    imageLoad() {
      if(this.$refs.scroll) {
        this.$refs.scroll.refresh();
      }
    },
    detailPullingUp() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.finishPullUp();
    },
    titleClick(index) {
      // this.$refs.scroll.scrollTo(0, -themeTopYs[index], 100)
      if(index === 0) {
        this.$refs.scroll.scrollTo(0, 0, 100)
      }else if(index === 1) {
        this.$refs.scroll.scrollTo(0, -this.$refs.params.$el.offsetTop, 100)
      }else if(index ===2) {
        this.$refs.scroll.scrollTo(0, -this.$refs.comment.$el.offsetTop, 100)
      }else if(index ===3) {
        this.$refs.scroll.scrollTo(0, -this.$refs.recommend.$el.offsetTop, 100)
      }
    },
    detailScroll(position) {
      // 显示backtop
      this.isShowBackTop = -position.y > 150;
      // 滚动移动navbar
      if(this.$refs.params.$el.offsetTop>-position.y) {
        this.currentIndex = 0;
        this.$refs.detailnav.currentIndex = this.currentIndex
      }else if(-position.y>=this.$refs.params.$el.offsetTop && this.$refs.comment.$el.offsetTop>-position.y) {
        this.currentIndex = 1;
        this.$refs.detailnav.currentIndex = this.currentIndex
      }else if(-position.y>=this.$refs.comment.$el.offsetTop && this.$refs.recommend.$el.offsetTop>-position.y) {
        this.currentIndex = 2;
        this.$refs.detailnav.currentIndex = this.currentIndex
      }else if(-position.y>=this.$refs.recommend.$el.offsetTop) {
        this.currentIndex = 3;
        this.$refs.detailnav.currentIndex = this.currentIndex
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //(x,y,time)
    },
    addToCart() {
      // 获取商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
    }
  }
}
</script>

<style scoped>
#detail-main {
  height: 100vh;
  touch-action: none   /**滚动与bscroll冲突，加入此属性可解决 */
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 93px);
}
</style>