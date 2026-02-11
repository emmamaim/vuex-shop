// 所有登錄相關的接口請求
import request from '@/utils/request'

// 1.獲取圖形驗證碼
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2.獲取短信驗證碼
export const getMsgCode = (capchaCode, capchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      capchaCode,
      capchaKey,
      mobile
    }
  })
}

// 3.登錄接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}
