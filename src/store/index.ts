// @ts-ignore
import Vue from "nativescript-vue";
import Vuex from "vuex";

import Counter, { ICounterState } from "./modules/counter";
import Auth, { IAuth } from "./modules/auth";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

interface RootState {
  Auth: IAuth;
  Counter: ICounterState;
}

const store = new Vuex.Store<RootState>({
  modules: {
    counter: Counter,
    auth: Auth
  },
  strict: debug
});

Vue.prototype.$store = store;

export default store;
