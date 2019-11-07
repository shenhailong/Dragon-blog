import axios from 'axios'
// 全局方法axios 组件内使用 this.$axios 无需在每个组件单独引入
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$axios', { value: axios })
  }
}
