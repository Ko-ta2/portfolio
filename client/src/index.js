import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import router from './router';
import store from './store';

import App from './components/App.vue';

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'md'
});

const app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    'app': App
  },
  template: '<app></app>'
});