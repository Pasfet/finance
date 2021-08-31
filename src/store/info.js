import firebase from 'firebase/app';
export default {
  state: {
    info: {},
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },

  getters: {
    getInfo: state => state.info,
  },

  actions: {
    async fetchInfo({ dispatch, commit }) {
      const uid = await dispatch('getUid');
      const info = await (
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value')
      ).val();
      commit('setInfo', info);
    },
  },
};
