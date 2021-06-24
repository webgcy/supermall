<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      scroll: null,
    }
  },

mounted() {
  /**创建better-scroll实例 */
  this.scroll = new BScroll(this.$refs.wrapper, {
    probeType: this.probeType,
    click: true,
    pullUpLoad: this.pullUpLoad
  });
  /**监听滑动位置，发送事件 */
  if (this.probeType === 2 || this.probeType === 3) {
    this.scroll.on('scroll', (position) => {
    this.$emit('scroll',position)
  });
  }
  /**监听上拉事件 */
  if (this.pullUpLoad) {
    this.scroll.on('pullingUp', () => {
    this.$emit('pullingUp')
  })
  }
},

methods: {
  /**封装scrollTo方法 */
  scrollTo(x, y, time=600) {
    this.scroll && this.scroll.scrollTo(x, y, time)
  },
  /**封装finishPulUp方法 */
  finishPullUp() {
    this.scroll && this.scroll.finishPullUp()
  },
  refresh() {
    this.scroll && this.scroll.refresh()
  },
  getScrollY() {
    return this.scroll ? this.scroll.y : 0
  }
}
}
</script>

<style scoped>

</style>