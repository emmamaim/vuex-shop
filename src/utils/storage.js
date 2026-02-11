// 約定一個通用的key
const INFO_KEY = 'emma_shopping_info'
const HISTORY_KEY = 'emma_history_info'

// 獲取個人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 設置個人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除個人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 獲取搜索歷史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 設置搜索歷史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
