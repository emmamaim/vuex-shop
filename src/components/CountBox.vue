<template>
  <div class="count-box">
    <button class="minus" @click="handlerSub">-</button>
    <input :value="value" @change="handlerChange" class="inp" type="text">
    <button class="add" @click="handlerAdd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handlerAdd () {
      this.$emit('input', this.value + 1)
    },
    handlerSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    // 用戶手動輸入數字
    handlerChange (e) {
      const num = e.target.value
      // 輸入文本檢查
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
    .count-box{
        width: 110px;
        display: flex;
        .add, .minus{
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
        }
        .inp{
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            margin: 0 5px;
            background-color: #efefef;
            text-align: center;
        }
    }
</style>
