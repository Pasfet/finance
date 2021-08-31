import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase

firebase.initializeApp({
  apiKey: 'AIzaSyAknGtF2fRITlR8lxPdqkCwb934AUchPyE',
  authDomain: 'finance-app-gb.firebaseapp.com',
  projectId: 'finance-app-gb',
  storageBucket: 'finance-app-gb.appspot.com',
  messagingSenderId: '1050459152323',
  appId: '1:1050459152323:web:fcf8dea74c56913a8a6776',
  measurementId: 'G-E565NS36R3',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      render: h => h(App),
      store,
      router,
    }).$mount('#app');
  }
});
