import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'

import helper from './helper'
global.helper = helper

import './http'

import 'vuetify/src/stylus/main.styl'
import '@/styles/main.scss'

import VModalDialog from './components/common/ModalDialog.vue'
Vue.component('v-modaldialog', VModalDialog)

import VForm from './components/common/VForm'
Vue.component('v-form', VForm)

import VCustomDatePicker from './components/common/CustomDatePicker.vue'
Vue.component('v-customdatepicker', VCustomDatePicker)

import VCustomPagination from './components/common/CustomPagination.vue'
Vue.component('v-custompagination', VCustomPagination)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      // window.console.log(store.state.token)
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('checkAuth')
  }
}).$mount('#app')
