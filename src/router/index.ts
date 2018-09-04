// @ts-ignore
import Vue from "nativescript-vue";
import VueRouter from "vue-router";

import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { FingerprintAuth } from "nativescript-fingerprint-auth";

import Home from "../components/Home.vue";
import Counter from "../components/Counter.vue";
import Login from "../components/Login.vue";
import NewUser from "../components/NewUser.vue";

import store from "../store";

Vue.use(VueRouter);

// attach nativescript ios / android lifecycle event handlers
app.on(app.resumeEvent, onAppResume);

const router = new VueRouter({
  // @ts-ignore
  pageRouting: true,
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        title: "Home",
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: Login,
      meta: {
        title: "Login",
        requiresAuth: false
      }
    },
    {
      path: "/new-user",
      component: NewUser,
      meta: {
        title: "Welcome",
        requiresAuth: false
      }
    },
    {
      path: "/Counter",
      component: Counter,
      meta: {
        title: "Counter",
        requiresAuth: true
      }
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(`App settings: ${JSON.stringify(appSettings)}`);
  console.log(
    `Router beforeEach, from: ${from.fullPath}, to: ${JSON.stringify(
      to.fullPath
    )}`
  );

  // check if this is the first time a user has ever used the app:
  store.state.auth.isNewUser
    ? startNewUserFlow({ next: next })
    : checkAppUnlocked({ next: next, to: to });
});

export function requireLogin(obj: string) {
  console.log(`typescript check: ${obj}`);
  store.dispatch("hasLoggedOut");
  router.replace("/login"); // on launch, go to login
}

export function checkAppUnlocked({ next, to }) {
  // Lock down all vue routes that do not have { meta: { requiresAuth } }
  console.log("Router authentication lock");
  // console.log(JSON.stringify(store.state));
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.state.auth.isLoggedIn
  ) {
    next({
      path: "/login",
      component: Login,
      meta: {
        title: "Login",
        requiresAuth: false
      }
    });
  } else {
    next();
  }
}

export function onAppResume(args) {
  console.log("resume event!");
  if (args.android) {
    // for Android applications, args.android is an android activity class.
    console.log("Activity: " + args.android);
  } else if (args.ios) {
    // for iOS applications, args.ios is UIApplication.
    console.log("UIApplication: " + args.ios);
  }
}

export function startNewUserFlow({ next }) {
  console.log("going to set new user");
  store.dispatch("setIsNewUser", { value: true });
  console.log(`isNewUser: ${JSON.stringify(store.state.auth.isNewUser)}`);

  // go to new-user tutorial:
  next({
    path: "/new-user",
    component: NewUser,
    meta: {
      title: "Welcome",
      requiresAuth: false
    }
  });
}

requireLogin("this is a string"); // require login on launch
export default router;
