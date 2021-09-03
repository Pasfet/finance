import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import payments from './payments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    info,
    payments,
  },
});
