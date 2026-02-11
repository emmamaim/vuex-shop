import request from '@/utils/request'

// 加入購物車
// goodsId = 商品ID / goodsSkuId = 同商品但不同規格ID
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 獲取購物車列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新購物車商品的數量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 刪除購物車商品
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
