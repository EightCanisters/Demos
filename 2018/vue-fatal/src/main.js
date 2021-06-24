// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import * as ajax from './services'
import store from './store'

Vue.prototype.$ajax = ajax
Vue.config.productionTip = false
Vue.use(MintUI)

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    if (store.state.isLogin === false) {
      next({
        name: 'login',
        params: to
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
