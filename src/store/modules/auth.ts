import * as appSettings from "tns-core-modules/application-settings";

export interface IAuth {
  isLoggedIn: Boolean;
  hasFingerprint: Boolean;
  hasFaceId: Boolean;
  isNewUser: any;
}

const state: IAuth = {
  isLoggedIn: false,
  hasFingerprint: false,
  hasFaceId: false,
  isNewUser:
    typeof appSettings.getBoolean("isNewUser") === "undefined" ||
    appSettings.getBoolean("isNewUser") // initialized to nativescript local storage value. if undefined or true, it's a new user
};

const mutations = {
  hasLoggedIn(state) {
    state.isLoggedIn = true;
  },
  hasLoggedOut(state) {
    state.isLoggedIn = false;
  },
  setIsNewUser(state, value) {
    console.log(`hit setIsNewUser! value: ${value}`);
    state.isNewUser = value;
  }
};

const actions = {
  hasLoggedIn: ({ commit }) => commit("hasLoggedIn"),
  hasLoggedOut: ({ commit }) => commit("hasLoggedOut"),
  setIsNewUser: ({ commit }, { value }) => commit("setIsNewUser", value)
};

export default {
  state,
  mutations,
  actions
};
