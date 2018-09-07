// @ts-ignore
import Vue from "nativescript-vue";
import router from "./router";
import store from "./store";

import "./styles/app.android.scss";
import "./styles/app.ios.scss";

// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({
  router,
  store
}).$start();
