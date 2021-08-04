import Vue from 'vue'

import { Client } from '@persona/infra/web-sdk'

Vue.use({
  install (Vue, options) {
    Vue.prototype.$client = Client.create(Vue.prototype.$fireApp, 'https://mypersona.tk/api')
  }
})
