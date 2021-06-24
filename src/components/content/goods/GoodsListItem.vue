<template>
  <div class="goods-item" @click="goodsClick">
    <!-- 商品图片-->
    <img :src="showImage" alt="" @load="imgLoad">
    <!-- 商品信息-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price + '￥'}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },

  methods: {
    imgLoad() {
     this.emitter.emit('imgLoad')     //触发一个事件emit，监听一个事件on。
    },
    goodsClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
      
    }
  }
}
</script>

<style scoped>
  .goods-item {
     /* 里面的goodsitem info绝对定位脱离文档流，所以使用padding-bottom占据空位*/
    padding-bottom: 40px; 
    position: relative;       
    /* width: 100%; 将数据分成两行显示，结合flex-wrap使用*/
    width: 48%;            
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    height: 100%;     /**强行把图片拉满框227.5px */
  }

  .goods-info {             
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    /* text-overflow: ellipsis;	显示省略符号来代表被修剪的文本。 */
    text-overflow: ellipsis;
    /*white-space 规定段落中的文本不进行换行*/
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>