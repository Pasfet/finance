import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
  },
  mutations: {
    setPaymentsList(state, payload) {
      state.paymentsList = payload;
    },
    addToPaymentList(state, payload) {
      state.paymentsList.push(payload);
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
    },
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentValue: state => {
      return state.paymentsList.reduce((acc, cur) => acc + +cur.value, 0);
    },
  },
  actions: {
    async fetchData({ commit }) {
      const res = await new Promise(resolve => {
        const localStorageData = localStorage.getItem('finance');
        if (localStorageData) {
          resolve(JSON.parse(localStorageData));
        }
      });
      return commit('setPaymentsList', res);
    },
  },
});
