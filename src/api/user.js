import request from '@/utils/request'

// 獲取用戶信息
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
