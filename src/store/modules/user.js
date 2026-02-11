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

  },
  getters: {

  }
}
