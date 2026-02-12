import request from '@/utils/request'

// 訂單結算頁面
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      // mode:cart => obj {cartIds}
      // mode:buyNow => obj {goodsId, goodsNum, goodsSkuId}
      delivery: 10, // 10 快遞速配 20 門店自提
      couponId: 0, // 優惠券ID / 0 不使用優惠券
      isUsePoints: 0, // 積分 / 0 不使用積分
      ...obj // 傳過來的參數對象（動態展開）
    }
  }
  )
}

// 提交訂單
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    // mode:cart => obj {cartIds, remark}
    // mode:buyNow => obj {goodsId, goodsNum, goodsSkuId, remark}
    delivery: 10, // 10 快遞速配 20 門店自提
    couponId: 0, // 優惠券ID / 0 不使用優惠券
    isUsePoints: 0, // 積分 / 0 不使用積分
    payType: 10, // 餘額支付
    ...obj
  })
}

// 我的訂單-訂單列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType, // 訂單類型
      page // 訂單分頁
    }
  })
}
