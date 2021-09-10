import firebase from 'firebase/app';
export default {
  state: {
    error: null,
  },
  mutations: {
    setError(state, err) {
      state.error = err;
    },
  },
  actions: {
    async logIn({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
      }
    },
    async logOut({ commit }) {
      await firebase.auth().signOut();
      commit('clearInfo');
      commit('clearPaymentsList');
      commit('clearFilteredList');
    },
    async signUp({ dispatch }, { email, password, name }) {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch('getUid');
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          name,
        });
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
