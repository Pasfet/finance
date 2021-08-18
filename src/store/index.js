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
      const values = Object.values(state.paymentsList);
      if (values) {
        for (let i = 0; i < values.length; i++) {
          if (values[i].length < 5) {
            values[i].push(payload);
            break;
          }
          if (values[i].length === 5 && i === values.length - 1) {
            Vue.set(state.paymentsList, `page${values.length + 1}`, [payload]);
            break;
          }
        }
      }
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
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
    editPaymentCost(state, payload) {
      const values = Object.values(state.paymentsList);
      for (let i = 0; i < values.length; i++) {
        const find = values[i].find(el => el.id === payload.id);
        if (find) {
          find.value = payload.value;
          find.category = payload.category;
          find.date = payload.date;
        }
      }
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
    },
    deletePaymentCost(state, payload) {
      const pages = Object.keys(state.paymentsList);
      for (let i = 0; i < pages.length; i++) {
        const find = state.paymentsList[pages[i]].find(
          el => el.id === payload.id
        );

        if (find) {
          state.paymentsList[pages[i]].splice(
            state.paymentsList[pages[i]].indexOf(find),
            1
          );
        }
      }
      localStorage.setItem('finance', JSON.stringify(state.paymentsList));
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
    getLastId: state => {
      const values = Object.values(state.paymentsList);
      const lastPayment = values[values.length - 1].length;
      return values[values.length - 1][lastPayment - 1].id;
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
        commit('setPaymentsList', resFetch);
        commit('setCategories', resFetch);
      }
      if (localStorageData) {
        commit('setPaymentsList', JSON.parse(localStorageData));
        commit('setCategories', JSON.parse(localStorageData));
      }
    },
    editPayment({ commit }, editCost) {
      commit('editPaymentCost', editCost);
    },
    deletePayment({ commit }, deleteCost) {
      commit('deletePaymentCost', deleteCost);
    },
    addPayment({ commit }, addPayment) {
      commit('addToPaymentList', addPayment);
    },
  },
});
