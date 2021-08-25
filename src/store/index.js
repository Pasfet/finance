import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categories: [],
  },
  mutations: {
    setPaymentsList(state, payload) {
      state.paymentsList = payload;
    },
    addToPaymentsList(state, payload) {
      state.paymentsList.push(payload);
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
    },
    setCategoriesList(state) {
      const categories = state.paymentsList.map(cost => cost.category);
      for (let i = 0; i < categories.length; i++) {
        if (state.categories.includes(categories[i])) {
          continue;
        }
        state.categories.push(categories[i]);
      }
    },
    editPaymentList(state, payload) {
      const find = state.paymentsList.find(el => el.id === payload.id);
      if (find) {
        find.value = payload.value;
        find.category = payload.category;
        find.date = payload.date;
      }
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
    },
    deletedPayment(state, payloadId) {
      const find = state.paymentsList.find(el => el.id === payloadId);
      if (find) {
        state.paymentsList.splice(state.paymentsList.indexOf(find), 1);
      }
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
    },
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getLastId: state =>
      state.paymentsList.length
        ? state.paymentsList[state.paymentsList.length - 1].id
        : 0,
    getCategories: state => state.categories,
    getPieData: state => {
      const data = [];
      const res = [];
      state.paymentsList.forEach(cost => {
        const { category, value } = cost;
        data.push({ category, value });
      });
      data.forEach(cost => {
        const find = res.find(el => el.category === cost.category);
        if (find) {
          find.value += cost.value;
        } else {
          res.push(cost);
        }
      });
      return res;
    },
  },
  actions: {
    fetchData({ commit }) {
      const localStorageData = localStorage.getItem('finance');

      if (localStorageData) {
        commit('setPaymentsList', JSON.parse(localStorageData));
        commit('setCategoriesList');
      }
    },
    addPayment({ commit }, payment) {
      commit('addToPaymentsList', payment);
      commit('setCategoriesList');
    },
    editPayment({ commit }, payment) {
      commit('editPaymentList', payment);
      commit('setCategoriesList');
    },
    deletePayment({ commit }, paymentId) {
      commit('deletedPayment', paymentId);
    },
  },
});
