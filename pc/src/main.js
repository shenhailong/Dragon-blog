import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from './config/axiosPlugin'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

process.env.NODE_ENV === 'production' && Sentry.init({
  dsn: 'https://23354c3b2a2646d68e6aaeabb9951718@sentry.io/1844682',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})
Vue.use(AxiosPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
