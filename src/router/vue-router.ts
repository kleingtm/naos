// @ts-ignore
import Vue from "nativescript-vue";
import VueRouter from "vue-router";

import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
// import { FingerprintAuth } from "nativescript-fingerprint-auth";

import Home from "../components/Home.vue";
import Counter from "../components/Counter.vue";
import Login from "../components/Login.vue";
import NewUser from "../components/NewUser.vue";

import store from "../store";
import {Route} from 'vue-router/types/router';
import {EventData} from 'tns-core-modules/ui/frame'; //

Vue.use(VueRouter);

// attach nativescript ios / android lifecycle event handlers\
app.on(app.resumeEvent, args => {
    console.log("resume event!");
    if (args.android) {
        // for Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    } else if (args.ios) {
        // for iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios); //
    }
});

const router = new VueRouter({
    // @ts-ignore
    pageRouting: true,
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {
                title: "Home",
                requiresAuth: true
            }
        },
        {
            path: '/hello',
            component: NewUser,
            meta: {
                title: 'Hello World',
            },
        },
        {
            path: "/login",
            component: Login,
            meta: {
                title: "Login",
                requiresAuth: false
            }
        },
        // {
        //     path: "/new-user",
        //     component: NewUser,
        //     meta: {
        //         title: "Welcome",
        //         requiresAuth: false
        //     }
        // },
        {
            path: "/counter",
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

router.beforeEach((to: Route, from: Route, next: any) => {
    console.log(`App settings: ${JSON.stringify(appSettings)}`);
    console.log(
        `Router beforeEach, from: ${from.fullPath}, to: ${JSON.stringify(
            to.fullPath
        )}`
    );

    // check if this is the first time a user has ever used the app:
    checkAppUnlocked({ to, next });
});

export function checkAppUnlocked({ next, to }: {next: any, to: Route}) {
    // Lock down all vue routes that do not have { meta: { requiresAuth } }
    console.log("Router authentication lock");
    console.log(JSON.stringify(store.state));
    if (to.matched.some(record => record.meta.requiresAuth) && !store.state.Auth.isLoggedIn) {
      console.log('went here');
      next({
            path: "/login",
            component: Login,
            meta: {
                title: "Login",
                requiresAuth: false
            }
        });
    }
    else {
        console.log('nope, went here');
        next();
    }
}

// export function startNewUserFlow({ next }: {next: any}) {
//     console.log("going to set new user");
//     store.dispatch("setIsNewUser", { value: true });
//     console.log(`isNewUser: ${JSON.stringify(store.state.Auth.isNewUser)}`);
//
//     // go to new-user tutorial:
//     next({
//         path: "/new-user",
//         component: NewUser,
//         meta: {
//             title: "Welcome",
//             requiresAuth: false
//         }
//     });
// }
//
// export function requireLogin(obj: string) {
//     console.log(`typescript check: ${obj}`);
//     store.dispatch("hasLoggedOut");
//     // router.replace("/login"); // on launch, go to login
// }
// requireLogin("this is a string"); // require login on launch
router.replace('/home');
export default router;
