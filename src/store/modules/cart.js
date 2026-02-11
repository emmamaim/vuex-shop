import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 存放購物車列表
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 點擊checkbox 選中的狀態取反
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 點擊全選，同步小選框
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 複選框選中的狀態，手動維護數據，添加isChecked狀態
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改 再同步後臺
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    // 刪除購物車數據
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('刪除成功')
      // 刪除購物車后重新渲染
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 購物車總數求和
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 選中的商品 isChecked
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 選中的總數
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 選中商品的總價
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 全選框 狀態
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
