import request from '@/utils/request'

// 獲取地址信息
export const getAddressList = () => {
  return request.get('/address/list')
}
