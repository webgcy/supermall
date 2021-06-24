<template>
  <div class="cart">
    <!-- 导航nav -->
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from "vuex";

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
       ...mapGetters({
        length: "cartLength",
        list: "cartList",
      }),
    }
  }
</script>

<style scoped>

.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.cart {
  height: 100vh;
}
</style>
