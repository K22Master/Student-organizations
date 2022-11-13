import Vue from 'vue'
import App from './App.vue'
// 导入element UI组件库
import Element from 'element-ui';
// 导入element UI样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入图标库
import 'font-awesome/css/font-awesome.min.css'
// 导入二次封装的axios
import service from './utils/service'
// 导入echarts
import * as echarts from 'echarts';
// 导入路由模块
import router from './router'
import API from './api'

// 使用elemenui
Vue.use(Element);
// 挂载到Vue原型上，全局使用
Vue.prototype.$API = API;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


new Vue({
  // 挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
