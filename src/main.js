import 'vuetify/dist/vuetify.min.css'
import '@/styles/main.scss'

import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'

import helper from './helper'
global.helper = helper

import './http'

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
    if (global.helper.ls.get('x-kzhhr-token')) {
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

import { excuteApis } from '@/api'
new Vue({
  data: { dicts: ['industry', 'transformer'] },
  router,
  store,
  render: h => h(App),
  created() {
    this.initDict()
  },
  methods: {
    initDict() {
      let promises = []
      this.dicts.map(dict => {
        promises.push(
          excuteApis(
            { dictname: dict },
            global.config.adminApis,
            'dict',
            'index'
          )
        )
      })
      Promise.all(promises).then(response => {
        this.dicts.map((dict, index) => {
          this[dict] = response[index].data.data.data
        })
        this.$store.dispatch('dictsList', {
          industry: this['industry'],
          transformer: this['transformer']
        })
      })
    }
  }
}).$mount('#app')
