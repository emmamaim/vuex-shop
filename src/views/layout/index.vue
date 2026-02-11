<template>
  <div class="">
    <!-- 二級路由顯示位置 -->
    <router-view/>
    <!-- 底部導航 -->
    <van-tabbar route v-model="active" active-color="#ee0000" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首頁</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">分類頁</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">購物車</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: '0'
    }
  }
}
</script>

<style></style>
