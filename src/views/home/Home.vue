<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <!-- 动态的tabControl -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl02"
      class= 'Fixed'
      v-show='isDone'
    >
    </tab-control>

    <!-- scroll组件管理滚动 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-Up-Load="true"
      @scroll="contentScroll"
      @pullingUp="contentPullUp">
      <!--轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <!-- 推荐部分 -->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!-- 功能图片 -->
      <feature-view></feature-view>
      <!-- 3小分类 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl01">
      </tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    
    <!-- 回到顶部-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childCpmps/HomeSwiper";
import HomeRecommendView from "./childCpmps/HomeRecommendView";
import FeatureView from "./childCpmps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import Scroll from "components/common/scroll/Scroll";
import {itemListenerMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  mixins: [itemListenerMixin],

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      isDone: false,
      tabControloffsetTop: 0,
      saveY: 0,
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0.05);
  },
  
  deactivated() {
    // 保存y的偏移值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消监听时间总线
    this.emitter.off("imgLoad", this.itemImageListener)
  },

  created() {
    //请求轮播图和推荐位数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    /**HomeSwiper组件发送的tab-control的滚动位置 */
    swiperImgLoad() {
        this.tabControloffsetTop = this.$refs.tabControl01.$el.offsetTop
    },
    /**tab-control事件监听 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //两个组件点击显示同步
      this.$refs.tabControl01.currentIndex = index;
      this.$refs.tabControl02.currentIndex = index;
    },
    /**轮播图和推荐位数据 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    /**商品列表数据 */
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    /*top-back */
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //(x,y,time)
    },
    /**接收backtop的scroll位置显示
     * 接收tabcontrol吸顶效果位置
     */
    contentScroll(position) {
      this.isShowBackTop = -position.y > 150;
      this.isDone = -position.y > this.tabControloffsetTop
    },
    /**接收上拉加载事件，并调用完成方法 */
    contentPullUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
      this.$refs.scroll.refresh()
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-bottom: 1000px;         /*暂时隔开底部。*/
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  height: calc(100% - 49px);
  overflow: hidden;
  position: absolute;
  top: 44px;
}

.Fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}
</style>
