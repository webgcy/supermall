<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button class="checked-all"></check-button>
        <span>全选</span>
      </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';
import { mapGetters } from "vuex";

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' +this.cartList.filter(item => {
        return item.checked}).reduce((pre, item) => {
          return pre + item.price * item.count
        }, 0)
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    }
  },
  methods: {
    calcClick() {

    },
  }

}
</script>

<style scoped>
.bottom-bar{
  position: fixed;
  height: 40px;
  left: 0;
  right: 0;
  bottom: 49px;
  line-height: 40px;
  background-color: #eee;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.checked-all{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.totalPrice {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: #fb7299;
  text-align: center;
  color: #ffffff;
}
</style>