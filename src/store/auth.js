import firebase from 'firebase/app';
export default {
  state: {
    error: null,
  },

  getters: {
    getError: state => state.error,
  },

  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
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
      await commit('clearInfo');
      await commit('clearPaymentsList');
      await commit('clearFilteredList');
    },
    async signUp({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            name,
          });
      } catch (e) {
        commit('setError', e);
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
