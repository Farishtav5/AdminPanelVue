import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router"
import store from './store'
import moment from "moment"

Vue.prototype.moment = moment

import Default from "./layouts/Default.vue"
import NoHeader from "./layouts/NoHeader.vue"

Vue.component('default-layout',Default);
Vue.component('no-header-layout',NoHeader);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
