import firebase from 'firebase/app';
export default {
  actions: {
    async logIn({ email, password }) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    },
    async logOut({ commit }) {
      await firebase.auth().signOut();
      await commit('clearInfo');
      await commit('clearPaymentsList');
      await commit('clearFilteredList');
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
