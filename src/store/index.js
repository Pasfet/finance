import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: {},
    categories: [],
  },
  mutations: {
    setPaymentsList(state, payload) {
      state.paymentsList = payload;
    },
    addToPaymentList(state, payload) {
      const pages = Object.values(state.paymentsList);
      if (pages[pages.length - 1].length < 5) {
        pages[pages.length - 1].push(payload);
        localStorage.setItem('finance', JSON.stringify(state.paymentsList));
      } else {
        Vue.set(state.paymentsList, `page${pages.length + 1}`, [payload]);
        localStorage.setItem('finance', JSON.stringify(state.paymentsList));
      }
    },
    setCategories(state) {
      const categories = Object.values(state.paymentsList).map(arr =>
        arr.map(cat => cat.category)
      );
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].length; j++) {
          if (state.categories.includes(categories[i][j])) {
            continue;
          }
          state.categories.push(categories[i][j]);
        }
      }
    },
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFullPaymentValue: state => {
      const arrs = Object.values(state.paymentsList).map(page => {
        return page.reduce((acc, cur) => acc + +cur.value, 0);
      });
      const sum = arrs.reduce((acc, cur) => acc + cur, 0);
      return sum;
    },
    getFullLength: state => {
      const arrs = Object.values(state.paymentsList).map(arr => arr.length);
      const length = arrs.reduce((acc, cur) => acc + cur, 0);
      return length;
    },
    getCategories: state => state.categories,
    getPieData: state => {
      const values = Object.values(state.paymentsList);
      const data = [];
      const res = [];
      values.forEach(arr =>
        arr.forEach(cost => {
          const { category, value } = cost;
          data.push({ category, value });
        })
      );
      for (let i = 0; i < data.length; i++) {
        const find = res.find(el => el.category === data[i].category);
        if (find) {
          find.value += data[i].value;
        } else {
          res.push(data[i]);
        }
      }
      return res;
    },
  },
  actions: {
    async fetchData({ commit }) {
      const url = `https://raw.githubusercontent.com/Pasfet/finance/vuex/src/store/dataLesson.json`;

      const response = await fetch(url);
      const resFetch = await response.json();
      const localStorageData = localStorage.getItem('finance');

      if (resFetch) {
        // localStorage.setItem('finance', JSON.stringify(resFetch));
        commit('setPaymentsList', resFetch);
        commit('setCategories', resFetch);
      }
      if (localStorageData) {
        commit('setPaymentsList', JSON.parse(localStorageData));
        commit('setCategories', JSON.parse(localStorageData));
      }
    },
  },
});
