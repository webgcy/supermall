import { createStore } from 'vuex'

const state = {
  cartList: []
}

const mutations = {
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  }
}

const getters = {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}

const actions = {
  addCart(context, payload){  
    return new Promise((resolve, reject) => {
      // 查找是否已经含有商品
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断oldproduct
      if(oldproduct) {
        context.commit('addCounter', oldproduct)
        resolve('当前购买商品数量+1')
      } else{
        payload.count =1;
        context.commit('addToCart', payload)
        resolve('添加当前商品到购物车')
      }
    })
  },
}

export default createStore({
  state,
  mutations,
  actions,
  getters
  
})