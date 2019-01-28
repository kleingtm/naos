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