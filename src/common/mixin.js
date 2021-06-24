import {debounce} from 'common/utils'

export const itemListenerMixin = {
  data() {
   return {
    itemImageListener: null
   }
  },
  //应用防抖事件，图片最后一次加载后执行refresh。并监听事件总线
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImageListener = () => {
      refresh()
    }
    this.emitter.on("imgLoad", this.itemImageListener)
  }
}