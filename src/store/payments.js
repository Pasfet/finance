import firebase from 'firebase/app';

export default {
  state: {
    paymentsList: [],
    categories: [],
    filteredList: [],
  },
  mutations: {
    setPaymentsList(state, payload) {
      state.paymentsList = payload;
    },
    clearPaymentsList(state) {
      state.paymentsList = [];
    },
    clearFilteredList(state) {
      state.filteredList = [];
    },
    setFilteredList(state, payload) {
      if (payload) {
        const regExp = new RegExp(payload, 'i');
        state.filteredList = state.paymentsList.filter(payment =>
          regExp.test(payment.category)
        );
      }
      if (Array.isArray(payload) || !payload) {
        state.filteredList = state.paymentsList;
      }
    },
    addToPaymentsList(state, payload) {
      state.paymentsList.push(payload);
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
    },
    deletedPayment(state, payloadId) {
      const find = state.paymentsList.find(el => el.id === payloadId);
      if (find) {
        state.paymentsList.splice(state.paymentsList.indexOf(find), 1);
      }
    },
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getFilteredList: state => state.filteredList,
    getCategories: state => state.categories,
    getPieData: state => {
      const data = [];
      const res = [];
      if (Array.isArray(state.filteredList)) {
        state.filteredList.forEach(cost => {
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
      }
      return res;
    },
  },
  actions: {
    async fetchData({ commit, dispatch }) {
      const uid = await dispatch('getUid');
      const paymentsList = await (
        await firebase
          .database()
          .ref(`/users/${uid}/payments`)
          .once('value')
      ).val();
      if (paymentsList) {
        commit('setPaymentsList', paymentsList.payments);
        commit('setFilteredList', paymentsList.payments);
        commit('setCategoriesList');
      }
    },
    async addPayment({ dispatch, commit }, payment) {
      await commit('addToPaymentsList', payment);
      await dispatch('addPaymentToDatabase');
    },
    async addPaymentToDatabase({ dispatch, state }) {
      const uid = await dispatch('getUid');
      const payments = state.paymentsList;
      await firebase
        .database()
        .ref(`/users/${uid}/payments`)
        .update({
          payments,
        });
    },
    async editPayment({ commit, dispatch, state }, payment) {
      await commit('editPaymentList', payment);
      const uid = await dispatch('getUid');
      const payments = state.paymentsList;

      await firebase
        .database()
        .ref(`/users/${uid}/payments`)
        .update({ payments });
    },

    async deletePayment({ dispatch, commit, state }, paymentId) {
      await commit('deletedPayment', paymentId);
      const uid = await dispatch('getUid');
      const payments = state.paymentsList;

      await firebase
        .database()
        .ref(`/users/${uid}/payments`)
        .update({ payments });
    },

    searchList({ commit }, search) {
      commit('setFilteredList', search);
    },
  },
};
