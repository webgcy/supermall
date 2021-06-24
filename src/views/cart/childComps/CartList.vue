<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true">
        <cart-list-item v-for="(item, index) in cartList" :key='index' :item-info='item'></cart-list-item>
      </scroll>
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";

export default {
  name: 'CartList',
  components: {
     Scroll,
     CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
  position: relative;
  top: 44px;
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>