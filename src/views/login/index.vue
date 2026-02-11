<template>
  <div class="login">
    <!-- navbar -->
    <van-nav-bar title="會員登錄" left-arrow @click-left="$router.go(-1)"/>

    <div class="container">
      <div class="title">
        <h3>手機號登錄</h3>
        <p>未注冊的手機號登錄后將自動注冊</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" v-model="mobile" maxlength="11" placeholder="請輸入手機號碼" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="請輸入圖形驗證碼" type="text">
          <img :src="picUrl" alt="" v-if="picUrl" @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode"  placeholder="請輸入短信驗證碼" type="text">
          <button @click="getCode">{{ second == totalSecond ? '獲取驗證碼' : second + '秒后重新發送'}}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登錄</div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'

export default {
  name: 'LoginPage',
  async created () {
    this.getPicCode()
  },
  // 離開頁面清除定時器
  destroyed () {
    clearInterval(this.timer)
  },
  data () {
    return {
      // 圖形驗證碼(用戶輸入的驗證碼内容/key(id)/url)
      picCode: '',
      picKey: '',
      picUrl: '',
      // 手機短信驗證碼(縂秒數/當前秒數/定時器ID/手機號)
      totalSecond: 60,
      second: 60,
      time: null,
      mobile: '',
      // 登錄(短信驗證碼)
      msgCode: ''
    }
  },
  methods: {
    // 獲取圖形驗證碼
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      // this.$toast.success('獲取圖形驗證碼成功')
    },
    // 封裝校驗手機號/圖形驗證碼的函數
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('請輸入正確的手機號碼')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('請輸入正確的圖形驗證碼')
        return false
      }
      return true
    },
    // 獲取短信驗證碼
    async getCode () {
      // 排空檢查(手機號/圖形驗證碼)
      if (!this.validFn()) {
        return
      }
      // 當前沒有計時器，且totalSecond == second才可以倒計時
      if (!this.timer && this.totalSecond === this.second) {
        // 發送短信驗證碼請求
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信發送成功，請注意查收')
        console.log(res)

        // 開啓倒計時
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登錄
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('請輸入正確的手機驗證碼')
        return
      }

      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast('登錄成功！')

      // 其他頁面攔截回登錄頁，登錄後跳轉回
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
</style>
