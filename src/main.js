import Vue from 'vue';
import store from './store';
import router from './router';
import modal from './plugins/ModalWindow';
// import tooltip from './plugins/Tooltip';
import ContextMenu from './plugins/ContextMenu/';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.component('contextMenu', ContextMenu);
Vue.use(modal);
// Vue.use(tooltip);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
