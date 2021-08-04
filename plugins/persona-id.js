import Vue from 'vue'

const VALUE_KEY = 'PERSONA_CURRENT_ID_VALUE'

Vue.use({
  install (Vue, options) {
    Vue.prototype.$currentID = new Proxy({ value: '' }, {
      get (target, p, receiver) {
        switch (p) {
          case 'value':
            return window.sessionStorage.getItem(VALUE_KEY) || ''
          default:
            throw new Error(p + ' is not a valid property')
        }
      },
      set (target, p, value, receiver) {
        switch (p) {
          case 'value':
            window.sessionStorage.setItem(VALUE_KEY, value || '')
            return true
          default:
            throw new Error(p + ' is not a valid property')
        }
      }
    })
  }
})
