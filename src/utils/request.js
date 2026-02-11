import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 創建axios實例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 自定義配置 (請求/響應攔截器)
// 請求攔截器
instance.interceptors.request.use(function (config) {
  // 開啓loading（節流，防止多次無效觸發)
  Toast.loading({
    // 信息/禁止背景點擊/自定義圖標/持續時長
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })

  // 只要有token，就在請求時携帶，便於請求需要token的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 發生請求錯誤時，做些什麼
  return Promise.reject(error)
})

// 回應攔截器
instance.interceptors.response.use(function (response) {
  // 任何 2xx 的 HTTP 狀態碼，將會觸發此函數
  const res = response.data
  if (res.status !== 200) {
    // 只要不等於200，就抛出一個錯誤的toast和promise
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 正確情況，走業務核心邏輯
    Toast.clear()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

// 導出
export default instance
