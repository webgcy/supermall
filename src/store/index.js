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
    // 查找是否已经含有商品
    let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldproduct
    if(oldproduct) {
      // oldProduct.count +=1
      context.commit('addCounter', oldproduct)
    } else{
      payload.count =1;
      // state.cartList.push(payload)
      context.commit('addToCart', payload)
    }
  },
}

export default createStore({
  state,
  mutations,
  actions,
  getters
  
})