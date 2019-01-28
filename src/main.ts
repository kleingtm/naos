// import 'auth0-js/build/auth0.js';

// @ts-ignore
import Vue from "nativescript-vue";
import "./router";
import store from "./store";

import "./styles/app.android.scss";
import "./styles/app.ios.scss";

import Login from "./components/Login.vue"; // default route

// Uncomment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({
  store,
  render: h => h('frame', [h(Login)])
}).$start();
