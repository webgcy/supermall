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
      // oldProduct.count +=1              这里存在深拷贝、浅拷贝相关知识。PS：引用数据
        context.commit('addCounter', oldproduct)
        resolve('当前购买商品数量+1')
      } else{
        payload.count =1;
        // state.cartList.push(payload)
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