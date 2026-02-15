# vuex-shop（移動端電商專案）
## Project Overview 線上預覽：
https://emmamaim.github.io/vuex-shop/

## Demo Notice 提醒
本專案使用第三方測試 API <br>
```
Test Account: 18999292929 

verification code: 246810
```

```
項目API由《黑马程序员前端》提供：https://s.apifox.cn/12ab6b18-adc2-444c-ad11-0e60f5693f66/doc-2221080
```
（如 API 停用或資料為空，可能為測試環境限制）

## Tech Stack 技術棧
Vue 2 / Vue CLI / Vue Router / Vuex / Axios / Vant UI

## Architecture Design 架構設計
### 1. API Layer Abstraction
所有 API 請求皆集中於 api/ 目錄管理，並透過 utils/request.js 建立 Axios 實例。
設計重點：<br>
統一 baseURL <br>
請求攔截器（Loading 控制）<br>
回應攔截器（錯誤集中處理）<br>
Token 自動注入 <br>
非 200 狀態統一錯誤處理 <br>

### 2. State Management Strategy -- Vuex
Vuex 採用模組化設計：<br>
store <br>
 ├── modules <br>
 │    ├── user <br>
 │    ├── cart <br>

### 3. Authentication & Route Guard 權限 & 路由守衛
Token 儲存於 Vuex<br>
未登入操作跳轉登入頁<br>
支援 backUrl 返回原頁<br>

## Core Features 核心功能模組
### 1. Home Page 首頁 
輪播圖展示<br>
分類導航<br>
商品推薦區塊<br>
資料驅動 UI 渲染<br>

### 2. Product Detail Page 商品詳情頁
動態路由參數處理<br>
商品圖片展示<br>
評價列表<br>
根據登入狀態控制購物行為<br>

### 3. Cart System 購物車系統
加入購物車<br>
數量修改<br>
單選 / 全選<br>
批次刪除<br>
Vuex 全域狀態管理<br>

## Author 作者
Emma-Mai

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
