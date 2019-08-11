// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, Axios, VueAxios);

// 注册完的组件 以这种方式进行引用
Vue.prototype.$axios = Axios
// AXios调用后台的基本路径
Axios.defaults.baseURL = "http://127.0.0.1:8360";


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render: h => h(App)
})
