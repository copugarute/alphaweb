import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebaseconfig'
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from 'firebase/auth'

const app = initializeApp(firebaseConfig);
const auth = getAuth()
export const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
  store.commit('traerEmail', user ? user.email : user);
});

Vue.config.productionTip = false

new Vue({
  auth,
  db,
  app,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
