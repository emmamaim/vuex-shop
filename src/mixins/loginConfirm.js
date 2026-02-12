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
  }
}
