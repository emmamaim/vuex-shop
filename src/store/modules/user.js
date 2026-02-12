// 本地持久化導入localstorage
import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 個人權證相關 userid / token
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }

  },
  actions: {
    // 賬號登出
    logout (context) {
      // 個人信息重置
      context.commit('setUserInfo', {})
      // 購物車信息重置 （跨模塊cart：'模塊名/action名', 參數, 全局設置）
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
