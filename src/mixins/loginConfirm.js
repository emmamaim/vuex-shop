export default {
  // vue組件實例的配置項 -> 通過語法混入組件内部
  // 注意點：如果此處data/methods和組件内同名，組件内優先級更高；如果同時有鈎子函數，則會用數組管理並統一執行
  data () {
    return {
      title: '標題'
    }
  },
  methods: {
    // 封裝未登入彈窗的方法 判斷token
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '溫馨提示',
          message: '此時需要先登入才能操作哦',
          confirmButtonText: '去登入',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => { })
        return true
      } return false
    }
    // 測試專用（因爲後端資料獲取需要token才能進行）
    // loginConfirm () {
    //   // --- 測試開關：手動改為 true 即可強制攔截 ---
    //   const FORCE_NO_TOKEN = true
    //   // 判斷條件：(測試模式開啟) 或者 (Vuex 裡沒有 token)
    //   if (FORCE_NO_TOKEN || !this.$store.getters.token) {
    //     this.$dialog.confirm({
    //       title: '溫馨提示',
    //       message: '此時需要先登入才能操作哦',
    //       confirmButtonText: '去登入',
    //       cancelButtonText: '再逛逛'
    //     })
    //       .then(() => {
    //         // 用戶點擊「去登入」
    //         this.$router.replace({
    //           path: '/login',
    //           query: {
    //             backUrl: this.$route.fullPath
    //           }
    //         })
    //       })
    //       .catch(() => {
    //         // 用戶點擊「再逛逛」，通常這裡不需額外處理
    //       })

    //     // 【關鍵】立即返回 true，告訴調用者「這次操作被攔截了」
    //     return true
    //   }
    //   // 有 token 且非測試狀態，返回 false
    //   return false
    // }
  }
}
