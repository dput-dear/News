
import Vue from 'vue'
import ElementUI from 'element-ui'
import Axios from 'axios'
import '../theme/index.css'
import App from './App'
import router from './router/router.js'
import $global from './common/global.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.prototype.$global = $global;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
