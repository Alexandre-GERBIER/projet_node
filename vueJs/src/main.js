// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SuiVue from 'semantic-ui-vue'
import '../semantic/dist/semantic.min.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import 'semantic-ui-css/semantic.min.css';
Vue.use(SuiVue,VueGoogleMaps, {
  load: {
    key: 'AIzaSyA5sybGvF05vsMGIyNRTGoqusIyG-5yNOU'
  }
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
