import request from '@/utils/request'

// 獲取首頁數據
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
